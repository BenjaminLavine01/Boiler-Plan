const express = require('express');
const router = express.Router();
const { pool } = require('../db');
const crypto = require('crypto');

// Hash password (simple hash - use bcrypt in production)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create new user
    const result = await pool.query(
      'INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING id, email, firstName, lastName',
      [email, hashedPassword, firstName || '', lastName || '']
    );

    const user = result.rows[0];
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find user
    const userResult = await pool.query(
      'SELECT id, email, password, firstName, lastName FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    const hashedPassword = hashPassword(password);

    if (user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get user's semesters and courses
    const semestersResult = await pool.query(
      'SELECT id, term, year FROM semesters WHERE userId = $1 ORDER BY year DESC, term',
      [user.id]
    );

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      semesters: semestersResult.rows,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const userResult = await pool.query(
      'SELECT id, email, firstName, lastName FROM users WHERE id = $1',
      [req.params.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];

    // Get user's semesters
    const semestersResult = await pool.query(
      'SELECT id, term, year FROM semesters WHERE userId = $1',
      [req.params.id]
    );

    // Get user's internships
    const internshipsResult = await pool.query(
      'SELECT id, company, role, startDate, endDate FROM internships WHERE userId = $1',
      [req.params.id]
    );

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      semesters: semestersResult.rows,
      internships: internshipsResult.rows
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
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
