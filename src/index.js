// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import './index.css'; // Ensure this file exists and is correctly linked
import Game from './Game';

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);


