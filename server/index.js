const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Database
const { pool, initializeDatabase } = require('./db');

// Initialize database tables on startup
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
  // Continue running even if init fails, tables might exist
});

// Test database connection
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('PostgreSQL connection failed:', err);
  } else {
    console.log('✅ PostgreSQL connected successfully');
  }
});

// Routes
const semesterRoutes = require('./routes/semesters');
const courseRoutes = require('./routes/courses');
const authRoutes = require('./routes/auth');
const internshipRoutes = require('./routes/internships');
const purdueCoursesRoutes = require('./routes/purdue-courses');

app.use('/api/semesters', semesterRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/purdue-courses', purdueCoursesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', database: 'PostgreSQL' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
