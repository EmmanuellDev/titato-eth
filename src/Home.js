import React, { useState } from 'react';
import './Home.css';
import logo from './titato-homepage-logo.jpg';
import rainbowWallet from './titato-rainbow-wallet.jpeg';
import trustWallet from './titato-trust-wallet.jpeg';
import metamaskWallet from './titato-metamask-wallet.jpeg';
import binanceChainWallet from './titato-binance-chain-wallet.jpeg';

const Home = () => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState(''); // For the pop-up message
  const [showPopup, setShowPopup] = useState(false);    // To control the visibility of the pop-up
 
  const openWalletTab = () => {
    setIsTabOpen(true);
  };

  const closeWalletTab = () => {
    setIsTabOpen(false);
  };

  const showPopupNotification = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Pop-up will disappear after 3 seconds
  };

  const handleWalletConnect = async (walletType) => {
    try {
      await connectWallet(walletType);
      showPopupNotification(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`);
      closeWalletTab(); // Close the tab after connecting
    } catch (error) {
      showPopupNotification(`Failed to connect to ${walletType}`);
    }
  };

  const connectWallet = async (walletType) => {
    try {
      let isConnected = false;

      if (walletType === 'metamask') {
        if (window.ethereum && window.ethereum.isMetaMask) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          isConnected = true;
        } else {
          showPopupNotification('MetaMask is not installed.');
          return;
        }
      } else if (walletType === 'rainbow') {
        if (window.ethereum && !window.ethereum.isMetaMask) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          isConnected = true;
        } else {
          showPopupNotification('Rainbow Wallet is not installed.');
          return;
        }
      } else if (walletType === 'trust') {
        if (window.ethereum && window.ethereum.isTrust) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          isConnected = true;
        } else {
          showPopupNotification('Trust Wallet is not installed.');
          return;
        }
      } else if (walletType === 'binance') {
        if (window.BinanceChain) {
          await window.BinanceChain.request({ method: 'eth_requestAccounts' });
          isConnected = true;
        } else {
          showPopupNotification('Binance Chain Wallet is not installed.');
          return;
        }
      } else {
        showPopupNotification('Unsupported wallet type.');
        return;
      }

      if (isConnected) {
        showPopupNotification(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`);
      }
    } catch (error) {
      console.error(`Error connecting ${walletType}:`, error);
      showPopupNotification(`Failed to connect to ${walletType}`);
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
      {showPopup && (
        <div className={`popup-notification ${showPopup ? 'show' : ''}`}>
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Home;
