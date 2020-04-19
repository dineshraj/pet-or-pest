import React from 'react';
import { hydrate } from 'react-dom';

import App from './components/App';

import './styles/app.scss';

hydrate(<App />, document.getElementById('pet-or-pest'));
