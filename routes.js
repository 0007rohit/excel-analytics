const express = require('express');
const multer = require('multer');
const router = express.Router();
const Upload = require('../models/Upload');
const jwt = require('jsonwebtoken');

const upload = multer({ dest: 'uploads/' });

const verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/', verify, upload.single('file'), async (req, res) => {
  const { chartType, xKey, yKey } = req.body;
  const record = await Upload.create({
    user: req.user.id,
    fileName: req.file.originalname,
    chartType,
    xKey,
    yKey,
  });
  res.json({ message: 'File uploaded and saved', record });
});

router.get('/history', verify, async (req, res) => {
  const uploads = await Upload.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(uploads);
});

module.exports = router;
