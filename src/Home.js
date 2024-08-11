import React, { useState } from 'react';
// Removed JsonRpcProvider import
import './Home.css';
import logo from './titato-homepage-logo.jpg';
import rainbowWallet from './titato-rainbow-wallet.jpeg';
import trustWallet from './titato-trust-wallet.jpeg';
import metamaskWallet from './titato-metamask-wallet.jpeg';
import binanceChainWallet from './titato-binance-chain-wallet.jpeg';


const Home = () => {
  const [isTabOpen, setIsTabOpen] = useState(false);

  const openWalletTab = () => {
    setIsTabOpen(true);
  };

  const closeWalletTab = () => {
    setIsTabOpen(false);
  };

  const handleWalletConnect = async (walletType) => {
    try {
      await connectWallet(walletType);
      alert(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`);
      closeWalletTab(); // Close the tab after connecting
    } catch (error) {
      alert(`Failed to connect to ${walletType}`);
    }
  };

  const connectWallet = async (walletType) => {
    try {
      if (walletType === 'metamask' || walletType === 'rainbow' || walletType === 'trust') {
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
          alert(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} is not installed.`);
          return;
        }
      } else if (walletType === 'binance') {
        if (window.BinanceChain) {
          await window.BinanceChain.request({ method: 'eth_requestAccounts' });
        } else {
          alert('Binance Chain Wallet is not installed.');
          return;
        }
      } else {
        alert('Unsupported wallet type.');
        return;
      }

      // You can handle additional logic if needed after connection
    } catch (error) {
      console.error(`Error connecting ${walletType}:`, error);
      throw error; // Re-throw the error to be caught by handleWalletConnect
    }
  };

  return (
    <div className="home-wrapper">
      <div className={`home-container ${isTabOpen ? 'blur' : ''}`}>
        <div className="home-text tic">TIC</div>
        <div className="home-text tac">TAC</div>
        <div className="home-text toe">TOE</div>
        <div className="connect-wallet">
          <button className="connect-wallet-button" onClick={openWalletTab}>Connect with your wallet</button>
        </div>
        <div className="footer">
          <div className="footer-text">
            Developed by <img src={logo} alt="Logo" className="footer-logo-inline" /> Emman
          </div>
        </div>
      </div>
      {isTabOpen && (
        <div className="wallet-options-tab">
          <div className="wallet-option" onClick={() => handleWalletConnect('rainbow')}>
            <img src={rainbowWallet} alt="Rainbow Wallet" className="wallet-icon" /> Rainbow Wallet
          </div>
          <div className="wallet-option" onClick={() => handleWalletConnect('trust')}>
            <img src={trustWallet} alt="Trust Wallet" className="wallet-icon" /> Trust Wallet
          </div>
          <div className="wallet-option" onClick={() => handleWalletConnect('metamask')}>
            <img src={metamaskWallet} alt="MetaMask" className="wallet-icon" /> MetaMask
          </div>
          <div className="wallet-option" onClick={() => handleWalletConnect('binance')}>
            <img src={binanceChainWallet} alt="Binance Chain Wallet" className="wallet-icon" /> Binance Chain Wallet
          </div>
          <button className="back-button" onClick={closeWalletTab}>Back</button>
        </div>
      )}
    </div>
  );
};

export default Home;
