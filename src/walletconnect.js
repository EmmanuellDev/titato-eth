// walletconnect.js

import { Web3Modal } from '@web3modal/react';

// Initialize Web3Modal
export const initWeb3Modal = () => {
  return new Web3Modal({
    cacheProvider: true, // Optional
    providerOptions: {} // Required
  });
};

// Connect to the wallet
export const connectWallet = async (walletType) => {
  let accounts;
  try {
    if (walletType === 'metamask' || walletType === 'rainbow' || walletType === 'trust') {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await window.ethereum.request({ method: 'eth_accounts' });
      } else {
        alert(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} is not installed.`);
        return;
      }
    } else if (walletType === 'binance') {
      if (window.BinanceChain) {
        await window.BinanceChain.request({ method: 'eth_requestAccounts' });
        accounts = await window.BinanceChain.request({ method: 'eth_accounts' });
      } else {
        alert('Binance Chain Wallet is not installed.');
        return;
      }
    } else {
      alert('Unsupported wallet type.');
      return;
    }

    if (accounts.length === 0) {
      alert('No accounts found. Please check your wallet.');
      return;
    }

    console.log(`${walletType.charAt(0).toUpperCase() + walletType.slice(1)} connected successfully!`);
  } catch (error) {
    console.error(`Error connecting ${walletType}:`, error);
    alert(`Failed to connect ${walletType}.`);
  }
};
