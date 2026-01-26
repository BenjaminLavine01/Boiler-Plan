const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all internships for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, company, role, startDate, endDate, description FROM internships WHERE userId = $1 ORDER BY startDate DESC',
      [req.params.userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single internship
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, userId, company, role, startDate, endDate, description FROM internships WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new internship
router.post('/', async (req, res) => {
  try {
    const { userId, company, role, startDate, endDate, description } = req.body;
    if (!userId || !company || !role) {
      return res.status(400).json({ message: 'userId, company, and role required' });
    }

    const result = await pool.query(
      'INSERT INTO internships (userId, company, role, startDate, endDate, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, company, role, startDate || null, endDate || null, description || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an internship
router.put('/:id', async (req, res) => {
  try {
    const { company, role, startDate, endDate, description } = req.body;
    const result = await pool.query(
      'UPDATE internships SET company = COALESCE($1, company), role = COALESCE($2, role), startDate = COALESCE($3, startDate), endDate = COALESCE($4, endDate), description = COALESCE($5, description) WHERE id = $6 RETURNING *',
      [company, role, startDate, endDate, description, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an internship
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM internships WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ message: 'Internship deleted successfully', id: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
