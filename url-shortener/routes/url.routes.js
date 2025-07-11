
const express = require('express');
const router = express.Router();
const { shortenUrl, getStats } = require('../controllers/url.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/shorten', auth, shortenUrl);
router.get('/stats/:shortCode', auth, getStats);

module.exports = router;
