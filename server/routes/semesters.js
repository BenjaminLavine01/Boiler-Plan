const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester');
const Course = require('../models/Course');

// Get all semesters
router.get('/', async (req, res) => {
  try {
    const semesters = await Semester.find().populate('courses');
    res.json(semesters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single semester
router.get('/:id', async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id).populate('courses');
    if (!semester) {
      return res.status(404).json({ message: 'Semester not found' });
    }
    res.json(semester);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new semester
router.post('/', async (req, res) => {
  const semester = new Semester({
    name: req.body.name,
    year: req.body.year,
    season: req.body.season
  });

  try {
    const newSemester = await semester.save();
    res.status(201).json(newSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a semester
router.put('/:id', async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: 'Semester not found' });
    }

    if (req.body.name) semester.name = req.body.name;
    if (req.body.year) semester.year = req.body.year;
    if (req.body.season) semester.season = req.body.season;

    const updatedSemester = await semester.save();
    res.json(updatedSemester);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a semester
router.delete('/:id', async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: 'Semester not found' });
    }

    // Delete associated courses
    await Course.deleteMany({ semester: req.params.id });
    
    await Semester.findByIdAndDelete(req.params.id);
    res.json({ message: 'Semester deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
