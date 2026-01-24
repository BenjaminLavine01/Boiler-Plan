const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, major, graduationYear } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (in production, hash password)
    const user = new User({
      username,
      email,
      password, // WARNING: In production, hash this with bcrypt
      name,
      major: major || 'Computer Science',
      graduationYear: graduationYear || new Date().getFullYear() + 4
    });

    const savedUser = await user.save();
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      name: savedUser.name,
      email: savedUser.email,
      major: savedUser.major,
      graduationYear: savedUser.graduationYear
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
      .populate('semesters')
      .populate('internships');

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      major: user.major,
      graduationYear: user.graduationYear,
      semesters: user.semesters,
      internships: user.internships
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('semesters')
      .populate('internships');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { name, major, graduationYear, profilePicture } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (major) user.major = major;
    if (graduationYear) user.graduationYear = graduationYear;
    if (profilePicture) user.profilePicture = profilePicture;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
