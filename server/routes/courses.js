const express = require('express');
const router = express.Router();
const { pool } = require('../db');

// Get all courses for a user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'userId required' });
    }

    const result = await pool.query(
      `SELECT c.id, c.code, c.title, c.credits, c.description, c.prerequisites,
              us.grade, us.status
       FROM courses c
       LEFT JOIN user_schedule us ON c.id = us.courseId
       WHERE us.userId = $1
       ORDER BY c.title`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses by semester
router.get('/semester/:semesterId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.code, c.title, c.credits, c.description, us.grade, us.status
       FROM courses c
       JOIN user_schedule us ON c.id = us.courseId
       WHERE us.semesterId = $1
       ORDER BY c.title`,
      [req.params.semesterId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single course
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, code, title, credits, description, prerequisites FROM courses WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or add course to user schedule
router.post('/', async (req, res) => {
  try {
    const { userId, code, title, credits, semesterId, grade, status } = req.body;
    if (!userId || !code || !title || !semesterId) {
      return res.status(400).json({ message: 'userId, code, title, and semesterId required' });
    }

    // First, ensure course exists
    let courseResult = await pool.query('SELECT id FROM courses WHERE code = $1', [code]);
    
    let courseId;
    if (courseResult.rows.length === 0) {
      // Create course
      const createResult = await pool.query(
        'INSERT INTO courses (code, title, credits) VALUES ($1, $2, $3) RETURNING id',
        [code, title, credits]
      );
      courseId = createResult.rows[0].id;
    } else {
      courseId = courseResult.rows[0].id;
    }

    // Add to user schedule
    const scheduleResult = await pool.query(
      'INSERT INTO user_schedule (userId, courseId, semesterId, grade, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, courseId, semesterId, grade || null, status || 'planned']
    );

    res.status(201).json(scheduleResult.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a course enrollment
router.put('/:id', async (req, res) => {
  try {
    const { grade, status } = req.body;
    const result = await pool.query(
      'UPDATE user_schedule SET grade = COALESCE($1, grade), status = COALESCE($2, status) WHERE id = $3 RETURNING *',
      [grade, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a course enrollment
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM user_schedule WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json({ message: 'Course removed successfully', id: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
