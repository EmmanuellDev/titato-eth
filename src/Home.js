// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="App">
      <div className="title">
        <span className="title-T">T</span>
        <div className="title-rest">
          <div className="title-line">
            <span className="title-IC">I</span>
            <span className="title-IC">C</span>
          </div>
          <div className="title-line">
            <span className="title-IC">A</span>
            <span className="title-IC">C</span>
          </div>
          <div className="title-line">
            <span className="title-IC">O</span>
            <span className="title-IC">E</span>
          </div>
        </div>
      </div>
      <h1>Welcome to the Tic Tac Toe Game</h1>
      <Link to="/game">
        <button>Play Tic Tac Toe</button>
      </Link>
    </div>
  );
};

export default Home;
