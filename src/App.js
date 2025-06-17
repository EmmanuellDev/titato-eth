import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Modes from './pages/Modes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modes" element={<Modes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;