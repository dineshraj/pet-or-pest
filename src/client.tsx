import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';

import './styles/app.scss';

const imageData = document.querySelector('#imageData').textContent;
const imageDataArray = imageData.split(',');

hydrate(
  <App imageData={imageDataArray} firstClientRender={true} />,
  document.querySelector('#pet-or-pest')
);
