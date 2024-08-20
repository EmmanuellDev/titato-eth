// src/Mode.js
import React from 'react';
import './Mode.css'; // Import the corresponding CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

const Mode = () => {
  const navigate = useNavigate();

  const handleModeClick = (mode) => {
    console.log(`${mode} selected`);
    navigate(`/${mode.toLowerCase()}-mode`);
  };

  return (
    <div className="mode-container">
      <Link to="/mode">Select your Game Mode</Link>

      <div className="mode-buttons">
        <button onClick={() => handleModeClick('Easy')} className="mode-button easy">Easy Mode</button>
        <button onClick={() => handleModeClick('Moderate')} className="mode-button moderate">Moderate Mode</button>
        <button onClick={() => handleModeClick('Hard')} className="mode-button hard">Hard Mode</button>
      </div>
    </div>
  );
};

export default Mode;
