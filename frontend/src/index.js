import React from 'react';
import { render } from 'react-dom';

import App from './App';
import './index.css';

export const loadingGif = require('./assets/loading.gif');

const root = document.getElementById('root');

render(<App />, root);
