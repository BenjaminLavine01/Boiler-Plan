const mongoose = require('mongoose');

const purdueCoursesSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  credits: {
    type: Number,
    required: true,
    min: 0,
    max: 4
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  prerequisites: [{
    type: String,
    trim: true
  }],
  corequisites: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  workload: {
    type: String,
    enum: ['Light', 'Moderate', 'Heavy'],
    default: 'Moderate'
  },
  isCoreClass: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PurdueCourse', purdueCoursesSchema);
