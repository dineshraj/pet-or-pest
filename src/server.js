import path from 'path';
import fs from 'fs';
import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

const port = process.env.PORT || 8080;
const app = express();

const filePath = process.env.NODE_ENV === 'dev' ? 'src/views' : 'public';

// for IBM cloud
app.enable('trust proxy');

function handleRender(req, res) {
  const html = renderToString(<App />);

  fs.readFile(`${filePath}/main.html`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const document = data.replace(
      /<div id="pet-or-pest"><\/div>/,
      `<div id="pet-or-pest">${html}</div>`
    );
    res.send(document);
  });
}

function handle404(req, res) {
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
