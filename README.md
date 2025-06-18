# XO-TacTics
## Overview
XO-TacTics is a web-based Tic-Tac-Toe game built with React, featuring three challenging difficulty modes where players compete against Emma AI powered by the minimax algorithm with alpha-beta pruning. The game integrates with Ethereum Sepolia testnet via MetaMask, offering different blockchain rewards for each victory depending on the difficulty of the level.

## Game Modes

### 🟢 Easy Mode
- AI Difficulty: Makes occasional mistakes
- Reward: Your wallet address gets permanently stored on the blockchain
- Blockchain Impact: Immutable record of your victory in the WinnerRegistry contract

### 🟡 Moderate Mode  
- AI Difficulty: Strategic but beatable
- Reward: Exclusive XO-TacTics Victory NFT minted to your wallet
- NFT Details: ERC-721 token with unique identifier proving your win

### 🔴 Hard Mode
- AI Difficulty: Near-unbeatable (uses optimized minimax with alpha-beta pruning)
- Reward: 1 WIN token (ERC20) automatically sent to your wallet
- Token Utility: Tradeable cryptocurrency reward for elite players

## Features
- Three-tiered difficulty system with escalating rewards
- On-chain record of easy mode victories
- Collectible NFTs for moderate mode wins
- Cryptocurrency rewards for hard mode conquests
- Sleek animated UI with gradient backgrounds
- Responsive design for all devices

## TECH STACK

### Frontend:
- React: For building the user interface
- React Router: For navigation between pages
- ethers.js: For interacting with the Ethereum blockchain
- React Icons: For UI icons
- Tailwind CSS: Custom styles with animations and gradients

### Blockchain:
- Solidity: Smart contracts for WIN token (ERC20), WinnerRegistry, and XONFT (ERC721)
- OpenZeppelin: Secure contract implementations
- Sepolia Testnet: Ethereum test network for deployments

### Tools:
- MetaMask: Wallet connection and transaction signing
- Remix IDE: Contract compilation and deployment
- npm: Dependency management

## Prerequisites
- Node.js (v16+)
- MetaMask browser extension (configured for Sepolia)
- Sepolia test ETH (from [Sepolia Faucet](https://sepoliafaucet.com/))
- Remix IDE (for contract deployment)
- VS Code or similar text editor


## License
© 2025 XO-TacTics. All rights reserved. Designed by Emmanuel Ramamoorthy.
Contact
For support or contributions, contact [emmanuelsk04@gmail.com] or open an issue on GitHub.