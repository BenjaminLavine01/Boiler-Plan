const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  major: {
    type: String,
    default: 'Computer Science'
  },
  graduationYear: {
    type: Number,
    default: new Date().getFullYear() + 4
  },
  semesters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester'
  }],
  internships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
