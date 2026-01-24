const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const User = require('../models/User');

// Get all internships for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const internships = await Internship.find({ user: req.params.userId });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single internship
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new internship
router.post('/', async (req, res) => {
  const internship = new Internship({
    company: req.body.company,
    position: req.body.position,
    semester: req.body.semester,
    year: req.body.year,
    status: req.body.status || 'Applied',
    location: req.body.location,
    stipend: req.body.stipend || 0,
    description: req.body.description,
    user: req.body.userId
  });

  try {
    const newInternship = await internship.save();

    // Add to user's internships
    if (req.body.userId) {
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { internships: newInternship._id } }
      );
    }

    res.status(201).json(newInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an internship
router.put('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (req.body.company) internship.company = req.body.company;
    if (req.body.position) internship.position = req.body.position;
    if (req.body.semester) internship.semester = req.body.semester;
    if (req.body.year) internship.year = req.body.year;
    if (req.body.status) internship.status = req.body.status;
    if (req.body.location) internship.location = req.body.location;
    if (req.body.stipend !== undefined) internship.stipend = req.body.stipend;
    if (req.body.description) internship.description = req.body.description;

    const updatedInternship = await internship.save();
    res.json(updatedInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an internship
router.delete('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Remove from user's internships
    if (internship.user) {
      await User.findByIdAndUpdate(
        internship.user,
        { $pull: { internships: req.params.id } }
      );
    }

    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
