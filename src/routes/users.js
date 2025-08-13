const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users (for testing; secure in production)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { name, email, password, isAdmin } = req.body; // Destructure request body
  const user = new User({
    name,
    email,
    password, // In production, hash with bcrypt
    isAdmin: isAdmin || false,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;