
const Url = require('../models/url.model');
const shortid = require('shortid');
const validator = require('validator');

exports.shortenUrl = async (req, res) => {
  const { url, customCode } = req.body;

  if (!validator.isURL(url)) {
    return res.status(400).json({ message: 'Invalid URL' });
  }

  let shortCode = customCode || shortid.generate();

  const exists = await Url.findOne({ shortCode });
  if (exists) {
    return res.status(409).json({ message: 'Custom code already in use' });
  }

  const newUrl = await Url.create({
    originalUrl: url,
    shortCode,
    user: req.user.userId
  });

  res.status(201).json({
    originalUrl: url,
    shortUrl: `${process.env.BASE_URL}/r/${shortCode}`,
  });
};

exports.getStats = async (req, res) => {
  const { shortCode } = req.params;

  const url = await Url.findOne({ shortCode });
  if (!url) {
    return res.status(404).json({ message: 'Short URL not found' });
  }

  res.status(200).json({
    originalUrl: url.originalUrl,
    shortUrl: `${process.env.BASE_URL}/r/${url.shortCode}`,
    clicks: url.clicks,
  });
};
