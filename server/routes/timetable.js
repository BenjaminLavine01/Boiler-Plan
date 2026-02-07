const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all timetable slots for a semester
router.get('/', async (req, res) => {
  try {
    const { semesterId } = req.query;
    if (!semesterId) {
      return res.status(400).json({ message: 'semesterId required' });
    }
    const result = await pool.query(
      'SELECT id, semesterId, dayOfWeek, startTime, endTime, courseLabel FROM semester_timetable WHERE semesterId = $1 ORDER BY dayOfWeek, startTime',
      [semesterId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a timetable slot
router.post('/', async (req, res) => {
  try {
    const { semesterId, dayOfWeek, startTime, endTime, courseLabel } = req.body;
    if (!semesterId || dayOfWeek == null || !startTime || !endTime || !courseLabel) {
      return res.status(400).json({ message: 'semesterId, dayOfWeek, startTime, endTime, and courseLabel required' });
    }
    const result = await pool.query(
      'INSERT INTO semester_timetable (semesterId, dayOfWeek, startTime, endTime, courseLabel) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [semesterId, dayOfWeek, startTime, endTime, courseLabel.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a timetable slot
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM semester_timetable WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Timetable slot not found' });
    }
    res.json({ message: 'Deleted', id: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
