import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import Mode from './Mode'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/mode" component={Mode} />
        <Route path="/game" component={Game} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
