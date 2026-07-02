const express = require('express');
const {
  railFenceEncrypt,
  railFenceDecrypt,
  generateRsaKeys,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} = require('../utils/cryptoUtils');

const router = express.Router();

router.post('/rail-fence/encrypt', (req, res) => {
  const { plaintext, rails } = req.body;
  res.json({ success: true, ciphertext: railFenceEncrypt(plaintext, rails) });
});

router.post('/rail-fence/decrypt', (req, res) => {
  const { ciphertext, rails } = req.body;
  res.json({ success: true, plaintext: railFenceDecrypt(ciphertext, rails) });
});

router.post('/rsa/generate', (_req, res) => {
  const keys = generateRsaKeys();
  res.json({ success: true, ...keys });
});

router.post('/rsa/encrypt', (req, res) => {
  const { message, publicKey } = req.body;
  res.json({ success: true, encrypted: encryptWithPublicKey(message, publicKey) });
});

router.post('/rsa/decrypt', (req, res) => {
  const { encryptedMessage, privateKey } = req.body;
  res.json({ success: true, decrypted: decryptWithPrivateKey(encryptedMessage, privateKey) });
});

module.exports = router;
