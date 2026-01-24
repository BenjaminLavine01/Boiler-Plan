const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Semester = require('../models/Semester');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('semester');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses by semester
router.get('/semester/:semesterId', async (req, res) => {
  try {
    const courses = await Course.find({ semester: req.params.semesterId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('semester');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  const course = new Course({
    name: req.body.name,
    courseCode: req.body.courseCode,
    credits: req.body.credits,
    grade: req.body.grade || 'Not Graded',
    gpa: req.body.gpa || 0,
    semester: req.body.semester,
    description: req.body.description
  });

  try {
    const newCourse = await course.save();
    
    // Add course to semester
    if (req.body.semester) {
      await Semester.findByIdAndUpdate(
        req.body.semester,
        { $push: { courses: newCourse._id } }
      );
    }

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (req.body.name) course.name = req.body.name;
    if (req.body.courseCode) course.courseCode = req.body.courseCode;
    if (req.body.credits) course.credits = req.body.credits;
    if (req.body.grade) course.grade = req.body.grade;
    if (req.body.gpa !== undefined) course.gpa = req.body.gpa;
    if (req.body.description) course.description = req.body.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Remove course from semester
    if (course.semester) {
      await Semester.findByIdAndUpdate(
        course.semester,
        { $pull: { courses: req.params.id } }
      );
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
