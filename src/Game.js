// src/Game.js
import React, { useState, useEffect } from 'react';
import web3 from './web3'; // Import the Web3 setup
import TicTacToeABI from './TicTacToeABI.json'; // Save the ABI JSON file
import './Game.css'; // Import CSS for styling

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

const Game = () => {
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
        console.error('Error connecting to blockchain:', error);
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
    if (!gameActive || board[index] !== null) {
      return; // Prevent clicking on already filled cells or if the game is not active
    }

    const updatedBoard = [...board];
    updatedBoard[index] = isXNext ? 'X' : 'O'; // Set the cell to X or O based on isXNext
    setBoard(updatedBoard);
    setIsXNext(!isXNext); // Toggle the next move

    const winningLine = checkWinner(updatedBoard);
    if (winningLine) {
      setWinningCombination(winningLine);
      setGameActive(false); // Stop the game if there is a winner
      return;
    }

    try {
      await contract.methods.makeMove(index).send({ from: account });
      const boardState = await contract.methods.board().call();
      const mappedBoard = boardState.map(cell => cell === '1' ? 'X' : cell === '2' ? 'O' : null);
      setBoard(mappedBoard);
      const winningLine = checkWinner(mappedBoard);
      if (winningLine) {
        setWinningCombination(winningLine);
        setGameActive(false); // Stop the game if there is a winner
      }
    } catch (error) {
      console.error('Error making move:', error);
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

export default Game;
