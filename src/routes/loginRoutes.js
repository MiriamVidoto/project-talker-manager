const express = require('express');
const generateToken = require('../utils/generateToken');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;