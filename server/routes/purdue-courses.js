const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all Purdue courses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, code, title, credits, description, prerequisites FROM courses ORDER BY code'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by code
router.get('/:code', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, code, title, credits, description, prerequisites FROM courses WHERE code = $1',
      [req.params.code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search courses
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = `%${req.params.keyword}%`;
    const result = await pool.query(
      'SELECT id, code, title, credits, description FROM courses WHERE code ILIKE $1 OR title ILIKE $1 ORDER BY code',
      [keyword]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
