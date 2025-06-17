import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Modes from './pages/Modes';
import Easy from './pages/Easy';
import Moderate from './pages/Moderate';
import Hard from './pages/Hard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modes" element={<Modes />} />
        <Route path="/game-easy" element={<Easy />} />
        <Route path="/game-moderate" element={<Moderate />} />
        <Route path="/game-hard" element={<Hard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;