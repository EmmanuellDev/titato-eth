import React, { useState } from 'react';
import './Home.css';
import logo from './titato-homepage-logo.jpg';
//import rainbowWallet from './titato-rainbow-wallet.jpeg';
//import trustWallet from './titato-trust-wallet.jpeg';
import metamaskWallet from './titato-metamask-wallet.jpeg';
//import binanceChainWallet from './titato-binance-chain-wallet.jpeg';
import Button from './component/Wallet';

const Home = () => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState(''); // For the pop-up message
  const [showPopup, setShowPopup] = useState(false);  // To control the visibility of the pop-up
  const [showButton, setShowButton] = useState(false); // State to control Button visibility
  const [hideConnectButton, setHideConnectButton] = useState(false);
  
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
     // closeWalletTab(); // Close the tab after connecting
    } catch (error) {
      showPopupNotification(`Failed to connect to ${walletType}`);
    }
  };

  const handleConnectClick = () => {
    setShowButton(true); // Show Button after clicking "Connect your wallet"
    setHideConnectButton(true); // Hide "Connect your wallet" button
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
        <div className="home">
      {!hideConnectButton && (
        <div className="connect-wallet">
          <button className="connect-wallet-button" onClick={handleConnectClick}>
            Connect your wallet
          </button>
        </div>
      )}
      {showButton && (
        <div className="button-container">
          <Button />
        </div>
      )}
<div className="footer">
  <h2 className="footer-text">
    Developed by <img src={logo} alt="Logo" className="footer-logo-inline" /> Emman
  </h2>
</div>

    </div>
        </div>
      {showPopup && (
        <div className={`popup-notification ${showPopup ? 'show' : ''}`}>
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Home;
