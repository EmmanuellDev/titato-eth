// src/Board.js
import React from 'react';
import './Home.css';

const Board = ({ showcase }) => {
  const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']; // Example filled board
  const strikeIndex = [0, 4, 8]; // Diagonal strike example

  return (
    <div className="board">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`cell ${cell} ${strikeIndex.includes(index) ? 'strike' : ''}`}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Board;
