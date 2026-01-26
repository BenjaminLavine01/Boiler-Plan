const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all semesters for a user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId required' });
    }
    
    const result = await pool.query(
      'SELECT id, term, year, startDate, endDate FROM semesters WHERE userId = $1 ORDER BY year DESC, term',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single semester
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, term, year, startDate, endDate FROM semesters WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new semester
router.post('/', async (req, res) => {
  try {
    const { userId, term, year, startDate, endDate } = req.body;
    if (!userId || !term || !year) {
      return res.status(400).json({ message: 'userId, term, and year required' });
    }

    const result = await pool.query(
      'INSERT INTO semesters (userId, term, year, startDate, endDate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, term, year, startDate || null, endDate || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a semester
router.put('/:id', async (req, res) => {
  try {
    const { term, year, startDate, endDate } = req.body;
    const result = await pool.query(
      'UPDATE semesters SET term = COALESCE($1, term), year = COALESCE($2, year), startDate = COALESCE($3, startDate), endDate = COALESCE($4, endDate) WHERE id = $5 RETURNING *',
      [term, year, startDate, endDate, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a semester
router.delete('/:id', async (req, res) => {
  try {
    // Delete will cascade to user_schedule due to foreign key
    const result = await pool.query('DELETE FROM semesters WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.json({ message: 'Semester deleted successfully', id: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
