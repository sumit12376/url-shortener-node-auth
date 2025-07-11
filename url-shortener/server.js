
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = require('./app');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');

    const server = express();

    server.use(app);

    server.use(express.static(path.join(__dirname, 'dist')));
    server.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    server.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
