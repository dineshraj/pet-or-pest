import path from 'path';
import fs from 'fs';
import express, { json } from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

import ibm from 'ibm-cos-sdk';
import {
  endPoint,
  apiKey,
  resourceInstanceId,
  ibmAuthEndpoint,
  bucketName
} from '../config';

const storageConfig = {
  endpoint: endPoint,
  apiKeyId: apiKey,
  serviceInstanceId: resourceInstanceId,
  ibmAuthEndpoint
};
const cos = new ibm.S3(storageConfig);

const port = process.env.PORT || 8080;
const app = express();

// for IBM cloud
app.enable('trust proxy');

function getImages() {
  return cos.listObjects({ Bucket: bucketName }).promise();
}

function handleRender(req, res): void {
  getImages().then((imageData) => {
    const html = renderToString(<App imageData={imageData} />);

    fs.readFile(`public/main.html`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const document = data.replace(
        /<div id="pet-or-pest"><\/div>/,
        `<div id="pet-or-pest"><div id="imageData">
          ${JSON.stringify(imageData)}
        </div>${html}</div>`
      );
      res.send(document);
    });
  });
}

function handle404(req, res): void {
  res.status(404).send('<h1>404 Not Found</h1>');
}

app.use((req, res, next) => {
  if (req.secure || process.env.BLUEMIX_REGION === undefined) {
    next();
  } else {
    console.log('redirecting to https');
    res.redirect('https://' + req.headers.host + req.url);
  }
});
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', handleRender);
app.get('*', handle404);

app.listen(port, () => console.log(`listening on port ${port}`));
