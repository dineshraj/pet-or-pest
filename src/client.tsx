import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';

import './styles/app.scss';

const imageData = document.querySelector('#imageData').textContent;

hydrate(<App imageData={imageData} />, document.querySelector('#pet-or-pest'));
