const crypto = require('crypto');

const railFenceEncrypt = (text, rails) => {
  if (!text) return '';
  const key = Number(rails) || 2;
  const fence = Array.from({ length: key }, () => []);
  let rail = 0;
  let dir = 1;

  for (const char of text) {
    fence[rail].push(char);
    if (rail === key - 1) dir = -1;
    if (rail === 0) dir = 1;
    rail += dir;
  }

  return fence.map((row) => row.join('')).join('');
};

const railFenceDecrypt = (ciphertext, rails) => {
  if (!ciphertext) return '';
  const key = Number(rails) || 2;
  const railLengths = Array.from({ length: key }, () => 0);
  let rail = 0;
  let dir = 1;

  for (let i = 0; i < ciphertext.length; i += 1) {
    railLengths[rail] += 1;
    if (rail === key - 1) dir = -1;
    if (rail === 0) dir = 1;
    rail += dir;
  }

  const railsChars = Array.from({ length: key }, (_, index) => {
    const start = railLengths.slice(0, index).reduce((sum, value) => sum + value, 0);
    return ciphertext.slice(start, start + railLengths[index]).split('');
  });

  const plaintext = [];
  rail = 0;
  dir = 1;

  for (let i = 0; i < ciphertext.length; i += 1) {
    plaintext.push(railsChars[rail].shift());
    if (rail === key - 1) dir = -1;
    if (rail === 0) dir = 1;
    rail += dir;
  }

  return plaintext.join('');
};

const generateRsaKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  return {
    publicKey: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
    privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
  };
};

const encryptWithPublicKey = (message, publicKey) => {
  return crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(message, 'utf8')
  ).toString('base64');
};

const decryptWithPrivateKey = (encryptedMessage, privateKey) => {
  return crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedMessage, 'base64')
  ).toString('utf8');
};

module.exports = {
  railFenceEncrypt,
  railFenceDecrypt,
  generateRsaKeys,
  encryptWithPublicKey,
  decryptWithPrivateKey,
};
