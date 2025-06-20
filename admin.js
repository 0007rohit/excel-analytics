const express = require('express');
const router = express.Router();
const Upload = require('../models/Upload');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.get('/users', verifyAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/uploads', verifyAdmin, async (req, res) => {
  const uploads = await Upload.find().populate('user', 'email');
  res.json(uploads);
});

module.exports = router;
