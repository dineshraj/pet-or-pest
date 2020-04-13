import path from 'path';
import fs from 'fs';
export express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App';

const port = process.env.PORT || 8080;
const app = express();

function handleRender(req, res) {
  const html = renderToString(<App />);

  fs.readFile('/build/main.html', 'utf8', (err, data) => {
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
