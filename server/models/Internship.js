const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  semester: {
    type: String,
    enum: ['Spring', 'Summer', 'Fall', 'Winter'],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Applied', 'Pending', 'Accepted', 'Completed', 'Rejected'],
    default: 'Applied'
  },
  location: {
    type: String,
    trim: true
  },
  stipend: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Internship', internshipSchema);
