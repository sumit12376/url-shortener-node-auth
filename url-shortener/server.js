require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const urlRoutes = require('./routes/url.routes');
const authRoutes = require('./routes/auth.routes');
const limiter = require('./middlewares/rateLimiter');
const Url = require('./models/url.model');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/api', urlRoutes);

// Short URL redirection route
app.get('/r/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ message: 'Short URL not found' });

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
