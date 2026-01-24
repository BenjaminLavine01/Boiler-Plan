const express = require('express');
const router = express.Router();
const PurdueCourse = require('../models/PurdueCourse');

// Get all Purdue courses
router.get('/', async (req, res) => {
  try {
    const { department, difficulty, workload } = req.query;
    let query = {};

    if (department) query.department = department;
    if (difficulty) query.difficulty = parseInt(difficulty);
    if (workload) query.workload = workload;

    const courses = await PurdueCourse.find(query);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course by code
router.get('/:code', async (req, res) => {
  try {
    const course = await PurdueCourse.findOne({ courseCode: req.params.code });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses by department
router.get('/department/:dept', async (req, res) => {
  try {
    const courses = await PurdueCourse.find({ department: req.params.dept });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new course (admin only)
router.post('/', async (req, res) => {
  const course = new PurdueCourse({
    courseCode: req.body.courseCode,
    name: req.body.name,
    credits: req.body.credits,
    department: req.body.department,
    description: req.body.description,
    prerequisites: req.body.prerequisites || [],
    corequisites: req.body.corequisites || [],
    difficulty: req.body.difficulty || 3,
    workload: req.body.workload || 'Moderate',
    isCoreClass: req.body.isCoreClass || false
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
