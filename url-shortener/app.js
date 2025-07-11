// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const urlRoutes = require('./routes/url.routes');
// const authRoutes = require('./routes/auth.routes');
// const limiter = require('./middlewares/rateLimiter');
// const Url = require('./models/url.model');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(limiter);

// app.use('/auth', authRoutes);
// app.use('/api', urlRoutes);

// app.get('/r/:shortCode', async (req, res) => {
//   const { shortCode } = req.params;
//   const url = await Url.findOne({ shortCode });
//   if (!url) return res.status(404).json({ message: 'Short URL not found' });

//   url.clicks++;
//   await url.save();

//   return res.redirect(url.originalUrl);
// });

// module.exports = app;
