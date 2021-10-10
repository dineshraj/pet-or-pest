import path from 'path';
import fs from 'fs';
import express from 'express';

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

function getImages(): Promise<object> {
  return cos.listObjects({ Bucket: bucketName }).promise();
}

function formatImageData(rawImageData): Array<string> {
  return rawImageData.map((imageObject) => {
    return imageObject.Key;
  });
}

function shuffle(array): Array<string> {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function handleRender(req, res): void {
  getImages().then(({ Contents: rawImageData }: any) => {
    const imageData = formatImageData(rawImageData);
    const html = renderToString(<App imageData={shuffle(imageData)} />);

    fs.readFile(`public/main.html`, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const document = data.replace(
        /<div id="pet-or-pest"><\/div>/,
        `<div id="pet-or-pest">
          <div id="imageData">${imageData}</div>
          ${html}
        </div>`
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
