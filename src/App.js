// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Mode from './Mode';
import Hard from './Hard';
import Easy from './Easy';
import Moderate from './Moderate'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/mode" element={<Mode />} />
        <Route path="/easy-mode" element={<Easy />} />
        <Route path="/moderate-mode" element={<Moderate />} />
        <Route path="/hard-mode" element={<Hard />} />
      </Routes>
    </Router>
  );
};

export default App;
