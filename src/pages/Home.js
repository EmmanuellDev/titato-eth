import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import '../App.css';
import { IoIosLogOut } from "react-icons/io";
import { SiBattledotnet } from "react-icons/si";

const Home = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [networkCorrect, setNetworkCorrect] = useState(false);
  const [showDisconnect, setShowDisconnect] = useState(false);

  const sepoliaChainId = '0xaa36a7';

  useEffect(() => {
    checkIfWalletIsConnected();
    window.ethereum?.on('chainChanged', handleChainChanged);
    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setWalletConnected(false);
      setCurrentAccount(null);
      setShowDisconnect(false);
    } else {
      setCurrentAccount(accounts[0]);
      setWalletConnected(true);
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        setWalletConnected(true);
      }

      if (chainId === sepoliaChainId) {
        setNetworkCorrect(true);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId !== sepoliaChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: sepoliaChainId }],
          });
          setNetworkCorrect(true);
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: sepoliaChainId,
                    chainName: 'Sepolia Test Network',
                    nativeCurrency: {
                      name: 'SepoliaETH',
                      symbol: 'ETH',
                      decimals: 18,
                    },
                    rpcUrls: ['https://rpc2.sepolia.org'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io'],
                  },
                ],
              });
              setNetworkCorrect(true);
            } catch (addError) {
              console.error('Error adding Sepolia:', addError);
            }
          }
        }
      } else {
        setNetworkCorrect(true);
      }

      setCurrentAccount(accounts[0]);
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setCurrentAccount(null);
    setNetworkCorrect(false);
    setShowDisconnect(false);
  };

  const toggleDisconnect = () => {
    setShowDisconnect(!showDisconnect);
  };

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
            XO-TacTics
          </div>
          {walletConnected && networkCorrect && (
            <div className="relative flex items-center space-x-2">
              <button
                onClick={toggleDisconnect}
                className="flex items-center space-x-2 cursor-pointer hover:text-teal-400 transition-colors flex items-center space-x-2 bg-gray-800 bg-opacity-70 px-3 py-1 rounded-full font-mono"
              >
                <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-gray-300">
                  {currentAccount?.slice(0, 6)}...{currentAccount?.slice(-4)}
                </span>
              </button>
              {showDisconnect && (
                <button
                  onClick={disconnectWallet}
                  className="absolute top-full mt-2 px-4 flex justify-center items-center cursor-pointer  py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Disconnect
                  <div className='pl-2'><IoIosLogOut /></div>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="relative z-10 flex flex-col justify-center items-center flex-grow px-4">
        <div className="text-center max-w-screen">
          <h1 className="text-7xl lg:text-9xl home-text md:text-7xl mb-6">
            TIC TAC TOE
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl lg:ml-14">
            Play this classic game on the Ethereum blockchain. Challenge yourself by testing your skills against our Emma AI!
          </p>

          {!walletConnected || !networkCorrect ? (
            <button
              onClick={connectWallet}
              className="relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform group"
            >
              <span className="relative z-10">Connect Wallet</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 left-0 w-full h-full border-2 border-white rounded-full opacity-0 group-hover:opacity-100 animate-ping-slow"></span>
            </button>
          ) : (
            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-teal-400 border-opacity-30 max-w-md md:mx-auto lg:ml-42 ml-11 w-full">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-400 border-2 border-gray-800 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-teal-400 mb-2">Wallet Connected</h2>
                <p className="text-gray-300 mb-4 text-sm font-mono break-all">{currentAccount}</p>
                <button 
                  onClick={() => navigate('/modes')}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
                >
                  Continue to Game
                </button>
              </div>
            </div>
          )}
        </div>
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
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;