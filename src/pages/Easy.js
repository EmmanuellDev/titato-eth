import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Easy = () => {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState('');
  const [winningLine, setWinningLine] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && gameStarted && !isGameOver) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameStarted, isGameOver]);

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combination };
      }
    }
    return null;
  };

  const isBoardFull = (currentBoard) => {
    return currentBoard.every(cell => cell !== null);
  };

  const makeAIMove = () => {
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    
    if (availableMoves.length === 0) return;

    // Easy AI: Make random moves with 30% chance of making optimal move
    let aiMove;
    if (Math.random() < 0.3) {
      // Try to win or block player occasionally
      aiMove = findBestMove(availableMoves) || availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
      // Make random move
      aiMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    const newBoard = [...board];
    newBoard[aiMove] = 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      setGameStatus(result.winner === 'X' ? 
        `You Win, Congrats (${currentAccount ? currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4) : 'X'})!` : 
        'AI Wins!'
      );
      setIsGameOver(true);
    } else if (isBoardFull(newBoard)) {
      setGameStatus("It's a Draw!");
      setIsGameOver(true);
    } else {
      setIsPlayerTurn(true);
    }
  };

  const findBestMove = (availableMoves) => {
    // Check if AI can win
    for (let move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') {
        return move;
      }
    }

    // Check if AI needs to block player
    for (let move of availableMoves) {
      const testBoard = [...board];
      testBoard[move] = 'X';
      if (checkWinner(testBoard)?.winner === 'X') {
        return move;
      }
    }

    return null;
  };

  const handleCellClick = (index) => {
    if (!gameStarted || !isPlayerTurn || board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningLine(result.line);
      setGameStatus(result.winner === 'X' ? 
        `You Win, Congrats (${currentAccount ? currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4) : 'X'})!` : 
        'AI Wins!'
      );
      setIsGameOver(true);
    } else if (isBoardFull(newBoard)) {
      setGameStatus("It's a Draw!");
      setIsGameOver(true);
    } else {
      setIsPlayerTurn(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('');
    setWinningLine(null);
    setIsGameOver(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('');
    setWinningLine(null);
    setIsGameOver(false);
  };

  const getStrikeClass = () => {
    if (!winningLine) return '';
    
    const [a, b, c] = winningLine;
    
    // Row strikes
    if (a === 0 && b === 1 && c === 2) return 'strike-row-1';
    if (a === 3 && b === 4 && c === 5) return 'strike-row-2';
    if (a === 6 && b === 7 && c === 8) return 'strike-row-3';
    
    // Column strikes
    if (a === 0 && b === 3 && c === 6) return 'strike-col-1';
    if (a === 1 && b === 4 && c === 7) return 'strike-col-2';
    if (a === 2 && b === 5 && c === 8) return 'strike-col-3';
    
    // Diagonal strikes
    if (a === 0 && b === 4 && c === 8) return 'strike-diagonal-1';
    if (a === 2 && b === 4 && c === 6) return 'strike-diagonal-2';
    
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            Emma TTT Game
          </div>
          <div className="flex items-center space-x-4">
            {currentAccount && (
              <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-70 px-3 py-1 rounded-full">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-gray-300 font-mono">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                </span>
              </div>
            )}
            <button 
              onClick={() => navigate('/modes')}
              className="px-4 py-2 rounded-full bg-gray-800 bg-opacity-70 text-gray-300 hover:text-white transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center flex-grow px-4 py-8">
        {!gameStarted ? (
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              EASY MODE
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Perfect for beginners! The AI will make occasional mistakes to give you a fair chance.
            </p>
            <button
              onClick={startGame}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="text-center w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              EASY MODE
            </h2>
            
            <div className="mb-4">
              {gameStatus ? (
                <div className="text-2xl font-bold text-white mb-4">{gameStatus}</div>
              ) : (
                <div className="text-lg text-gray-300">
                  {isPlayerTurn ? 
                    `Your Turn (${currentAccount ? currentAccount.slice(0, 6) + '...' + currentAccount.slice(-4) : 'X'})` : 
                    "AI thinking... (O)"
                  }
                </div>
              )}
            </div>

            <div className="relative inline-block">
              <div className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-xl shadow-2xl">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className={`w-20 h-20 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-3xl font-bold transition-all duration-200 ${
                      winningLine?.includes(index) ? 'bg-green-500 text-white' : ''
                    } ${
                      cell === 'X' ? 'text-blue-400' : cell === 'O' ? 'text-red-400' : 'text-gray-400'
                    }`}
                    disabled={!gameStarted || !isPlayerTurn || cell || isGameOver}
                  >
                    {cell}
                  </button>
                ))}
              </div>
              
              {winningLine && (
                <div className={`absolute inset-0 pointer-events-none ${getStrikeClass()}`}></div>
              )}
            </div>

            <div className="mt-6 space-x-4">
              <button
                onClick={resetGame}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
              >
                Reset Game
              </button>
              <button
                onClick={() => navigate('/modes')}
                className="px-6 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                Change Mode
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 text-center py-6 bg-gray-800 bg-opacity-70 backdrop-blur-sm text-sm text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} EMMA CATERINGS. All rights reserved | Designed By Team Fortiv</p>
        </div>
      </footer>

      {/* Global styles for animations and strikes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        .strike-row-1, .strike-row-2, .strike-row-3,
        .strike-col-1, .strike-col-2, .strike-col-3,
        .strike-diagonal-1, .strike-diagonal-2 {
          background: linear-gradient(90deg, transparent 0%, #10b981 50%, transparent 100%);
          height: 4px;
          border-radius: 2px;
        }
        
        .strike-row-1 {
          top: calc(16px + 40px);
          left: 16px;
          right: 16px;
        }
        
        .strike-row-2 {
          top: calc(16px + 40px + 88px);
          left: 16px;
          right: 16px;
        }
        
        .strike-row-3 {
          top: calc(16px + 40px + 176px);
          left: 16px;
          right: 16px;
        }
        
        .strike-col-1 {
          left: calc(16px + 40px);
          top: 16px;
          bottom: 16px;
          width: 4px;
          height: auto;
          background: linear-gradient(0deg, transparent 0%, #10b981 50%, transparent 100%);
        }
        
        .strike-col-2 {
          left: calc(16px + 40px + 88px);
          top: 16px;
          bottom: 16px;
          width: 4px;
          height: auto;
          background: linear-gradient(0deg, transparent 0%, #10b981 50%, transparent 100%);
        }
        
        .strike-col-3 {
          left: calc(16px + 40px + 176px);
          top: 16px;
          bottom: 16px;
          width: 4px;
          height: auto;
          background: linear-gradient(0deg, transparent 0%, #10b981 50%, transparent 100%);
        }
        
        .strike-diagonal-1 {
          top: 50%;
          left: 16px;
          right: 16px;
          transform: translateY(-50%) rotate(45deg);
          transform-origin: center;
        }
        
        .strike-diagonal-2 {
          top: 50%;
          left: 16px;
          right: 16px;
          transform: translateY(-50%) rotate(-45deg);
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default Easy;