// testEthers.js
import { Web3Provider } from 'ethers';

const testProvider = new Web3Provider(new window.ethereum); // Use `window.ethereum` for browser-based providers
testProvider.getNetwork().then(network => {
  console.log('Network:', network);
}).catch(error => {
  console.error('Error:', error);
});
