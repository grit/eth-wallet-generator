const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const createKeccakHash = require('keccak');

// shows what 'ethers' library does under the hood with 'Wallet.createRandom()
/* const wallet = Wallet.createRandom();
  // gives access to below:
  -> wallet.privateKey
  -> wallet.publicKey
  -> wallet.address
*/

// generate random private key first
const buffer = crypto.randomBytes(32);
const PRIVATE_KEY = buffer.toString('hex');

const privateKeyBuffer = Buffer.from(PRIVATE_KEY, 'hex');
const pubKey = secp256k1.publicKeyCreate(privateKeyBuffer, false);

const address = createKeccakHash('keccak256')
  .update(Buffer.from(pubKey.slice(1)))
  .digest()
  .toString('hex');

console.log(`privateKey: 0x${PRIVATE_KEY}`);
console.log(`publicKey: 0x${Buffer.from(pubKey).toString('hex')}`);
console.log(`address: 0x${address.slice(-40)}`);
