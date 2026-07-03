const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const cryptoRoutes = require('./routes/crypto');

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Crypto demo server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

const startServer = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB connection skipped or failed:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer();
