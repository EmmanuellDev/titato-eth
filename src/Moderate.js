// src/Hard.js
import React, { useState, useEffect } from 'react';
import web3 from './web3'; // Import the Web3 setup
import TicTacToeABI from './TicTacToeABI.json'; // Save the ABI JSON file
import './Moderate.css'; // Import CSS for styling

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

const Moderate = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Track if the next move is X
  const [gameActive, setGameActive] = useState(true);
  const [winningCombination, setWinningCombination] = useState([]); // Track winning combination

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const instance = new web3.eth.Contract(TicTacToeABI, contractAddress);
  
        setAccount(accounts[0]);
        setContract(instance);
        const gameActive = await instance.methods.gameActive().call();
        setGameActive(gameActive);
      } catch (error) {
        console.error('Error connecting to blockchain:', JSON.stringify(error, null, 2));
      }
    };
  
    init();
  }, []);
  
  

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return lines[i];
      }
    }
    return null;
  };

  const handleCellClick = async (index) => {
    if (!gameActive || board[index] !== null || !isXNext) {
      return; // Prevent clicking on already filled cells, if the game is not active, or if it's not the user's turn
    }
  
    const updatedBoard = [...board];
    updatedBoard[index] = 'X'; // User plays 'X'
    setBoard(updatedBoard);
    setIsXNext(false); // Toggle the next move to the computer
  
    const winningLine = checkWinner(updatedBoard);
    if (winningLine) {
      setWinningCombination(winningLine);
      setGameActive(false); // Stop the game if there is a winner
      return;
    }
  
    try {
      // Let the computer make a move using moderate difficulty
      const computerMove = getModerateMove(updatedBoard);
      updatedBoard[computerMove] = 'O'; // Computer plays 'O'
      setBoard(updatedBoard);
      setIsXNext(true); // Toggle the next move back to the user
  
      const computerWinningLine = checkWinner(updatedBoard);
      if (computerWinningLine) {
        setWinningCombination(computerWinningLine);
        setGameActive(false); // Stop the game if there is a winner
      }
    } catch (error) {
      if (error.message) {
        console.error('Error message:', error.message);
      } else if (error.data && error.data.message) {
        console.error('Detailed error:', error.data.message);
      } else {
        console.error('Unhandled error:', JSON.stringify(error, null, 2));
      }
    }
  };
  
  
  

  const getModerateMove = (board) => {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    
    // Introduce a moderate difficulty by reducing the chance of making a random move
    const randomFactor = Math.random();
    if (randomFactor > 0.8) {
      // 20% chance to make a random move (80% chance to make the optimal move)
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
    
    let bestScore = -Infinity;
    let move;
  
    availableMoves.forEach((index) => {
      board[index] = 'O';
      const score = minimax(board, 0, false);
      board[index] = null;
      if (score > bestScore) {
        bestScore = score;
        move = index;
      }
    });
  
    return move;
  };
  


  const minimax = (board, depth, isMaximizing) => {
    const scores = {
      'X': -10,
      'O': 10,
      'draw': 0,
    };

    const result = checkWinner(board);
    if (result) {
      return scores[board[result[0]]];
    }

    if (board.every(cell => cell !== null)) {
      return scores['draw'];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = 'O';
          const score = minimax(board, depth + 1, false);
          board[index] = null;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      board.forEach((cell, index) => {
        if (cell === null) {
          board[index] = 'X';
          const score = minimax(board, depth + 1, true);
          board[index] = null;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell} ${winningCombination.includes(index) ? 'winner' : ''}`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
        {winningCombination.length > 0 && (
          <div
            className={`strike ${getStrikeClass(winningCombination)}`}
          />
        )}
      </div>
      <div className="status">
        {gameActive ? `Next Player: ${isXNext ? 'X' : 'O'}` : 'Game Over'}
      </div>
      <button onClick={() => window.location.reload()}>Restart Game</button>
    </div>
  );
};

const getStrikeClass = (winningCombination) => {
  if (winningCombination.includes(0) && winningCombination.includes(1) && winningCombination.includes(2)) {
    return 'strike-row-1';
  }
  if (winningCombination.includes(3) && winningCombination.includes(4) && winningCombination.includes(5)) {
    return 'strike-row-2';
  }
  if (winningCombination.includes(6) && winningCombination.includes(7) && winningCombination.includes(8)) {
    return 'strike-row-3';
  }
  if (winningCombination.includes(0) && winningCombination.includes(3) && winningCombination.includes(6)) {
    return 'strike-col-1';
  }
  if (winningCombination.includes(1) && winningCombination.includes(4) && winningCombination.includes(7)) {
    return 'strike-col-2';
  }
  if (winningCombination.includes(2) && winningCombination.includes(5) && winningCombination.includes(8)) {
    return 'strike-col-3';
  }
  if (winningCombination.includes(0) && winningCombination.includes(4) && winningCombination.includes(8)) {
    return 'strike-diag-1';
  }
  if (winningCombination.includes(2) && winningCombination.includes(4) && winningCombination.includes(6)) {
    return 'strike-diag-2';
  }
  return '';
};

export default Moderate;
