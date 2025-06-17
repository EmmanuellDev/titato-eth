import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GameEasy = ({ currentAccount }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [winningLine, setWinningLine] = useState([]);
  const boardRef = useRef(null);

  // Check for winner after each move
  useEffect(() => {
    const { winner: gameWinner, line } = calculateWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
    } else if (!board.includes(null)) {
      setWinner('draw');
    }
  }, [board]);

  // AI makes a move after player's turn
  useEffect(() => {
    if (!isPlayerTurn && !winner && gameStarted) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, gameStarted]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return { winner: null, line: [] };
  };

  const makeAIMove = () => {
    // Simple AI - makes random moves (easy mode)
    const emptySquares = board
      .map((square, index) => (square === null ? index : null))
      .filter(val => val !== null);

    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const newBoard = [...board];
      newBoard[emptySquares[randomIndex]] = 'O';
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  const handleClick = (index) => {
    if (!gameStarted || winner || !isPlayerTurn || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
    setIsPlayerTurn(true);
  };

  const startGame = () => {
    setGameStarted(true);
    setIsPlayerTurn(true);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningLine([]);
  };

  // Get strike line class based on winning line
  const getStrikeLineClass = () => {
    if (winningLine.length !== 3) return '';
    
    // Horizontal lines
    if (winningLine.includes(0) && winningLine.includes(1) && winningLine.includes(2)) 
      return 'strike-row-1';
    if (winningLine.includes(3) && winningLine.includes(4) && winningLine.includes(5)) 
      return 'strike-row-2';
    if (winningLine.includes(6) && winningLine.includes(7) && winningLine.includes(8)) 
      return 'strike-row-3';
    
    // Vertical lines
    if (winningLine.includes(0) && winningLine.includes(3) && winningLine.includes(6)) 
      return 'strike-col-1';
    if (winningLine.includes(1) && winningLine.includes(4) && winningLine.includes(7)) 
      return 'strike-col-2';
    if (winningLine.includes(2) && winningLine.includes(5) && winningLine.includes(8)) 
      return 'strike-col-3';
    
    // Diagonal lines
    if (winningLine.includes(0) && winningLine.includes(4) && winningLine.includes(8)) 
      return 'strike-diagonal-1';
    if (winningLine.includes(2) && winningLine.includes(4) && winningLine.includes(6)) 
      return 'strike-diagonal-2';
    
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/modes')}
          className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Modes
        </button>
        {currentAccount && (
          <div className="flex items-center bg-gray-800 px-3 py-1 rounded-full">
            <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
            <span className="text-sm">
              {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
            </span>
          </div>
        )}
      </header>

      {/* Main Game Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          EASY MODE
        </h1>

        {!gameStarted ? (
          <div className="text-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-xl font-bold hover:scale-105 transition-transform"
            >
              START GAME
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <p className="text-xl mb-2">
                {winner 
                  ? winner === 'draw' 
                    ? "Game ended in a draw!" 
                    : `Winner: ${winner}`
                  : isPlayerTurn 
                    ? "Your turn (X)"
                    : "AI is thinking..."}
              </p>
              {winner && (
                <button
                  onClick={resetGame}
                  className="mt-4 px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Play Again
                </button>
              )}
            </div>

            {/* Game Board with Strike Line */}
            <div className="relative mb-8">
              <div className={`grid grid-cols-3 gap-3 ${winner ? getStrikeLineClass() : ''}`}>
                {board.map((square, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-3xl font-bold rounded-lg 
                      ${square === 'X' ? 'bg-blue-500' : square === 'O' ? 'bg-red-500' : 'bg-gray-800 hover:bg-gray-700'}
                      ${winner && 'cursor-default'}
                      ${winningLine.includes(index) ? 'z-10' : ''}`}
                    disabled={!!winner}
                  >
                    {square}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} ETH Tic Tac Toe | Easy Mode
      </footer>

      {/* Strike Line Styles */}
      <style jsx global>{`
        .strike-row-1::after {
          content: "";
          position: absolute;
          width: 80%;
          height: 4px;
          background: white;
          top: 16.5%;
          left: 10%;
          animation: strike 0.5s ease-out;
        }

        .strike-row-2::after {
          content: "";
          position: absolute;
          width: 80%;
          height: 4px;
          background: white;
          top: 49.5%;
          left: 10%;
          animation: strike 0.5s ease-out;
        }

        .strike-row-3::after {
          content: "";
          position: absolute;
          width: 80%;
          height: 4px;
          background: white;
          top: 82.5%;
          left: 10%;
          animation: strike 0.5s ease-out;
        }

        .strike-col-1::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 80%;
          background: white;
          left: 16.5%;
          top: 10%;
          animation: strike 0.5s ease-out;
        }

        .strike-col-2::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 80%;
          background: white;
          left: 49.5%;
          top: 10%;
          animation: strike 0.5s ease-out;
        }

        .strike-col-3::after {
          content: "";
          position: absolute;
          width: 4px;
          height: 80%;
          background: white;
          left: 82.5%;
          top: 10%;
          animation: strike 0.5s ease-out;
        }

        .strike-diagonal-1::after {
          content: "";
          position: absolute;
          width: 90%;
          height: 4px;
          background: white;
          top: 50%;
          left: 5%;
          transform: rotate(45deg);
          animation: strike 0.5s ease-out;
        }

        .strike-diagonal-2::after {
          content: "";
          position: absolute;
          width: 90%;
          height: 4px;
          background: white;
          top: 50%;
          left: 5%;
          transform: rotate(-45deg);
          animation: strike 0.5s ease-out;
        }

        @keyframes strike {
          0% { width: 0; opacity: 0; }
          100% { width: 80%; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GameEasy;