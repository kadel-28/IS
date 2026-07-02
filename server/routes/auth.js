const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();

const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = hashPassword(password);
    const user = await User.create({ username, password: hashedPassword });

    return res.status(201).json({ success: true, user: { id: user._id, username: user.username } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const hashedInput = hashPassword(password);
    if (hashedInput !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    return res.status(200).json({ success: true, user: { id: user._id, username: user.username } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
