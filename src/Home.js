import React, { useState } from 'react';
import { ethers } from 'ethers';
import './Home.css';
import logo from './titato-homepage-logo.jpg'; // Adjust path if needed
import rainbowWallet from './titato-rainbow-wallet.jpeg'; // Updated path
import trustWallet from './titato-trust-wallet.jpeg'; // Updated path
import metamaskWallet from './titato-metamask-wallet.jpeg'; // Updated path
import binanceChainWallet from './titato-binance-chain-wallet.jpeg'; // Updated path

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const contractABI = [
  // ABI definition remains the same as before
];

const Home = () => {
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async (walletType) => {
    let provider;
    try {
      if (walletType === 'metamask') {
        if (window.ethereum) {
          provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
        } else {
          alert('MetaMask is not installed.');
          return;
        }
      } else if (walletType === 'rainbow') {
        if (window.ethereum) { // Fallback to Ethereum provider
          provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
        } else {
          alert('Rainbow Wallet is not installed.');
          return;
        }
      } else if (walletType === 'trust') {
        if (window.ethereum) { // Fallback to Ethereum provider
          provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
        } else {
          alert('Trust Wallet is not installed.');
          return;
        }
      } else if (walletType === 'binance') {
        if (window.BinanceChain) {
          provider = new ethers.BrowserProvider(window.BinanceChain);
          await provider.send("eth_requestAccounts", []);
        } else {
          alert('Binance Chain Wallet is not installed.');
          return;
        }
      } else {
        alert('Unsupported wallet type.');
        return;
      }

      const signer = provider.getSigner();
      const myContract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(myContract);
      setConnected(true);
      alert(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`);
    } catch (error) {
      console.error(`Error connecting ${walletType}:`, error);
      alert(`Failed to connect ${walletType}.`);
    }
  };

  const executeContractFunction = async () => {
    if (contract) {
      try {
        const tx = await contract.setValue(42); // Example function call
        await tx.wait();
        alert('Contract function executed successfully!');
      } catch (error) {
        console.error('Error executing contract function:', error);
        alert('Failed to execute contract function.');
      }
    } else {
      alert('Connect to a wallet first.');
    }
  };

  return (
    <div className="home-container">
      <div className="home-text tic">TIC</div>
      <div className="home-text tac">TAC</div>
      <div className="home-text toe">TOE</div>
      <div className="connect-wallet">
        Connect with your wallet
      </div>
      <div className="wallet-icons">
        <img src={rainbowWallet} alt="Rainbow Wallet" onClick={() => connectWallet('rainbow')} />
        <img src={trustWallet} alt="Trust Wallet" onClick={() => connectWallet('trust')} />
        <img src={metamaskWallet} alt="MetaMask Wallet" onClick={() => connectWallet('metamask')} />
        <img src={binanceChainWallet} alt="Binance Chain Wallet" onClick={() => connectWallet('binance')} />
      </div>
      <div className="footer">
        <div className="footer-text">
          Developed by <img src={logo} alt="Logo" className="footer-logo-inline" /> Emman
        </div>
      </div>
      {connected && (
        <button onClick={executeContractFunction}>
          Execute Contract Function
        </button>
      )}
    </div>
  );
};

export default Home;
