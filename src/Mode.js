// src/Mode.js
import React from 'react';
import './Mode.css'; // Import the corresponding CSS file for styling
import { Link } from 'react-router-dom';

const Mode = () => {
  const handleModeClick = (mode) => {
    console.log(`${mode} selected`);
    // Add logic to navigate or set the game difficulty based on the mode
  };

  return (
    <div className="mode-container">
    <Link to="/mode">Select Game Mode</Link>

      <div className="mode-buttons">
        <button onClick={() => handleModeClick('Easy')} className="mode-button easy">Easy Mode</button>
        <button onClick={() => handleModeClick('Moderate')} className="mode-button moderate">Moderate Mode</button>
        <button onClick={() => handleModeClick('Hard')} className="mode-button hard">Hard Mode</button>
      </div>
    </div>
  );
};

export default Mode;