import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonLock } from "react-icons/bs";
import '../App.css'
import { SiBattledotnet } from "react-icons/si";

const Modes = () => {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

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

  const modes = [
    {
      name: 'EASY',
      description: 'Perfect for beginners. The AI makes occasional mistakes.',
      color: 'from-green-400 to-emerald-600',
      hoverColor: 'from-green-500 to-emerald-700',
      route: '/game-easy'
    },
    {
      name: 'MODERATE',
      description: 'A balanced challenge. The AI plays smart but not perfect.',
      color: 'from-yellow-400 to-amber-600',
      hoverColor: 'from-yellow-500 to-amber-700',
      route: '/game-moderate'
    },
    {
      name: 'HARD',
      description: 'For the pros. The AI rarely makes mistakes and plays optimally.',
      color: 'from-red-400 to-rose-600',
      hoverColor: 'from-red-500 to-rose-700',
      route: '/game-hard'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-teal-400 to-purple-500 opacity-10"
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
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
            XO-Tactics
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
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-full bg-gray-800 bg-opacity-70 text-gray-300 hover:text-white transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center flex-grow px-4 py-12">
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
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl orbitron font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500">
                Choose Your Mode
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Select a difficulty level to challenge yourself against our Emma AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
              {modes.map((mode, index) => (
                <div 
                  key={index}
                  onClick={() => navigate(mode.route)}
                  className={`bg-gradient-to-br ${mode.color} rounded-2xl p-0.5 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl`}
                >
                  <div className="bg-gray-900 rounded-2xl p-8 h-full flex flex-col items-center hover:bg-opacity-80 transition-all duration-300">
                    <h2 className="text-3xl font-bold mb-4 text-white">{mode.name}</h2>
                    <p className="text-gray-300 mb-6 text-center">{mode.description}</p>
                    <div className={`mt-auto px-6 py-3 rounded-full bg-gradient-to-r ${mode.color} eater-normal text-white font-semibold`}>
                      Play {mode.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="relative z-10 text-center py-6 bg-gray-800 bg-opacity-70 backdrop-blur-sm text-sm text-gray-400">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} XO-TacTics | All rights reserved</p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <h2 className='flex justify-between gap-2'><SiBattledotnet className='text-2xl' />Developed By<span className='orbitron'>Emmanuel Ramamoorthy</span></h2>
          </div>
        </div>
      </footer>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Modes;