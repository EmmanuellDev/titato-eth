import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BsPersonLock } from 'react-icons/bs';
import { ethers } from 'ethers';
import YW from '../requirements/you-won.png';

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenURI",
				"type": "string"
			}
		],
		"name": "mintWinnerNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractAddress = "0x9E2B0211384F6f01C2489F4750C6e53fFBD9bf9c";

const Moderate = () => {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState('');
  const [winningLine, setWinningLine] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [mintingStatus, setMintingStatus] = useState('');

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (!isPlayerTurn && gameStarted && !isGameOver) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameStarted, isGameOver]);

  useEffect(() => {
    // Mint NFT when user wins
    if (gameStatus.includes('You Win') && currentAccount) {
      mintNFT();
    }
  }, [gameStatus]);

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

  const mintNFT = async () => {
    if (!window.ethereum) {
      setMintingStatus('Please install MetaMask!');
      return;
    }

    try {
      setMintingStatus('Minting your NFT...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Placeholder token URI (replace with actual IPFS or hosted URL of you-won.png)
      const tokenURI = "https://green-obedient-lizard-820.mypinata.cloud/ipfs/bafkreia5lvwlnbdy2hdshjarguutlc3plhcwsxjhpup7amdznftmtscjpq"; // Update this
      const tx = await contract.mintWinnerNFT(currentAccount, tokenURI);
      await tx.wait();
      setMintingStatus('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintingStatus('Failed to mint NFT.');
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

    let aiMove;
    if (Math.random() < 0.8) {
      aiMove = getBestMove(board, 'O');
    } else {
      const strategicMoves = getStrategicMoves(availableMoves);
      aiMove = strategicMoves.length > 0 ? 
        strategicMoves[Math.floor(Math.random() * strategicMoves.length)] :
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
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

  const getBestMove = (currentBoard, player) => {
    const availableMoves = currentBoard.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') {
        return move;
      }
    }

    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'X';
      if (checkWinner(testBoard)?.winner === 'X') {
        return move;
      }
    }

    const center = 4;
    const corners = [0, 2, 6, 8];
    const edges = [1, 3, 5, 7];

    if (availableMoves.includes(center)) {
      return center;
    }

    const availableCorners = corners.filter(corner => availableMoves.includes(corner));
    if (availableCorners.length > 0) {
      if (currentBoard[0] === 'X' && availableMoves.includes(8)) return 8;
      if (currentBoard[2] === 'X' && availableMoves.includes(6)) return 6;
      if (currentBoard[6] === 'X' && availableMoves.includes(2)) return 2;
      if (currentBoard[8] === 'X' && availableMoves.includes(0)) return 0;
      
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const availableEdges = edges.filter(edge => availableMoves.includes(edge));
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const getStrategicMoves = (availableMoves) => {
    const center = 4;
    const corners = [0, 2, 6, 8];
    
    if (availableMoves.includes(center)) return [center];
    
    const availableCorners = corners.filter(corner => availableMoves.includes(corner));
    if (availableCorners.length > 0) return availableCorners;
    
    return availableMoves;
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
    setMintingStatus('');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('');
    setWinningLine(null);
    setIsGameOver(false);
    setMintingStatus('');
  };

  const getStrikeClass = () => {
    if (!winningLine) return '';
    
    const [a, b, c] = winningLine;
    
    if (a === 0 && b === 1 && c === 2) return 'strike-row-1';
    if (a === 3 && b === 4 && c === 5) return 'strike-row-2';
    if (a === 6 && b === 7 && c === 8) return 'strike-row-3';
    
    if (a === 0 && b === 3 && c === 6) return 'strike-col-1';
    if (a === 1 && b === 4 && c === 7) return 'strike-col-2';
    if (a === 2 && b === 5 && c === 8) return 'strike-col-3';
    
    if (a === 0 && b === 4 && c === 8) return 'strike-diagonal-1';
    if (a === 2 && b === 4 && c === 6) return 'strike-diagonal-2';
    
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 opacity-10"
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

      {!currentAccount ? (
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4">
          <div className="text-center">
            <BsPersonLock className="mx-auto text-9xl text-teal-400 mb-4" />
            <h1 className="text-5xl md:text-6xl orbitron font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500">
              Unauthorized
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Please connect your MetaMask wallet to access the game modes.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 text-white font-semibold hover:from-teal-500 hover:to-purple-600 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-xl eater-regular font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">
                Emma TTT-Game
              </div>
              <div className="flex items-center space-x-4">
                {currentAccount && (
                  <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-70 px-3 py-1 rounded-full">
                    <div className="h-2 w-2 rounded-full bg-orange-400 animate-pulse"></div>
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
                <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-600">
                  MODERATE MODE
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Step up the challenge! The AI plays strategically but still gives you opportunities to win with smart moves. Win to mint an exclusive NFT!
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <div className="text-center w-full max-w-md mx-auto">
                <h2 className="text-3xl eater-regular font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-600">
                  MODERATE MODE
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
                  {mintingStatus && (
                    <div className="text-lg text-orange-400 mt-2">{mintingStatus}</div>
                  )}
                </div>

                <div className="relative inline-block">
                  <div className="grid grid-cols-3 gap-3 bg-gray-800 p-6 rounded-xl shadow-2xl">
                    {board.map((cell, index) => (
                      <button
                        key={index}
                        onClick={() => handleCellClick(index)}
                        className={`w-28 h-28 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-5xl font-bold transition-all duration-200 ${
                          winningLine?.includes(index) ? 'bg-orange-500 text-white' : ''
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
        </>
      )}

      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        .strike-row-1, .strike-row-2, .strike-row-3,
        .strike-col-1, .strike-col-2, .strike-col-3,
        .strike-diagonal-1, .strike-diagonal-2 {
          background: linear-gradient(90deg, transparent 0%, #f97316 50%, transparent 100%);
          height: 6px;
          border-radius: 3px;
          z-index: 10;
        }
        
        .strike-row-1 {
          top: calc(24px + 56px);
          left: 24px;
          right: 24px;
        }
        
        .strike-row-2 {
          top: calc(24px + 56px + 124px);
          left: 24px;
          right: 24px;
        }
        
        .strike-row-3 {
          top: calc(24px + 56px + 248px);
          left: 24px;
          right: 24px;
        }
        
        .strike-col-1 {
          left: calc(24px + 56px);
          top: 24px;
          bottom: 24px;
          width: 6px;
          height: auto;
          background: linear-gradient(0deg, transparent 0%, #f97316 50%, transparent 100%);
        }
        
        .strike-col-2 {
          left: calc(24px + 56px + 124px);
          top: 24px;
          bottom: 24px;
          width: 6px;
          height: auto;
          background: linear-gradient(0deg, transparent 0%, #f97316 50%, transparent 100%);
        }
        
        .strike-col-3 {
          left: calc(24px + 56px + 248px);
          top: 24px;
          bottom: 24px;
          width: 6px;
          height: auto;
          background: linear-gradient(0deg, transparent 0%, #f97316 50%, transparent 100%);
        }
        
        .strike-diagonal-1 {
          top: 50%;
          left: 24px;
          right: 24px;
          transform: translateY(-50%) rotate(45deg);
          transform-origin: center;
        }
        
        .strike-diagonal-2 {
          top: 50%;
          left: 24px;
          right: 24px;
          transform: translateY(-50%) rotate(-45deg);
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default Moderate;