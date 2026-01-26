const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load env vars only if not in production (Vercel/Railway deployment)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
}

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Database
const { pool, initializeDatabase } = require('./db');

// Initialize database tables on startup (only for non-serverless environments)
// For Vercel serverless, initialization happens on first request if needed
if (process.env.VERCEL !== '1') {
  initializeDatabase().catch(err => {
    console.error('Failed to initialize database:', err);
    // Continue running even if init fails, tables might exist
  });

  // Test database connection (only for non-serverless)
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('PostgreSQL connection failed:', err);
    } else {
      console.log('✅ PostgreSQL connected successfully');
    }
  });
} else {
  // For Vercel serverless, initialize on first request
  let dbInitialized = false;
  app.use(async (req, res, next) => {
    if (!dbInitialized) {
      try {
        await initializeDatabase();
        dbInitialized = true;
        console.log('✅ Database initialized on first request');
      } catch (err) {
        console.error('Failed to initialize database:', err);
        // Continue anyway, tables might exist
      }
    }
    next();
  });
}

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

// Error handler
app.use((err, req, res, next) => {
  console.error('Express error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', database: 'PostgreSQL' });
});

// Catch-all 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found: ' + req.method + ' ' + req.path });
});

// Export for Vercel serverless functions
module.exports = app;

// Only start server if not running on Vercel
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Keep the server alive
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing gracefully...');
    server.close(() => process.exit(0));
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, closing gracefully...');
    server.close(() => process.exit(0));
  });

  // Handle uncaught errors
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
}
