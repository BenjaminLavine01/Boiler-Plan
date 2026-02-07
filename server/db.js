const { Pool } = require('pg');

// Load env vars only if not in production (Vercel/Railway deployment)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
}

// Use DATABASE_URL or POSTGRESQL_URL from environment
// Railway provides DATABASE_URL, but we can also use POSTGRESQL_URL
const connectionString = process.env.DATABASE_URL || process.env.POSTGRESQL_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL or POSTGRESQL_URL environment variable is not set');
}

// Create PostgreSQL connection pool
// For Railway/cloud databases, SSL is required
const pool = new Pool({
  connectionString: connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Connection pool settings for serverless (Vercel)
  max: 2, // Limit connections for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Initialize database tables
async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database tables...');
    
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Semesters table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS semesters (
        id SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        term VARCHAR(50) NOT NULL,
        year INTEGER NOT NULL,
        startDate DATE,
        endDate DATE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(userId, term, year)
      );
    `);

    // Courses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        code VARCHAR(20) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        credits INTEGER,
        description TEXT,
        prerequisites VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // User Schedule (enrollment) table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_schedule (
        id SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        courseId INTEGER NOT NULL REFERENCES courses(id),
        semesterId INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'planned',
        grade VARCHAR(2),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(userId, courseId, semesterId)
      );
    `);

    // Internships table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS internships (
        id SERIAL PRIMARY KEY,
        userId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        company VARCHAR(200) NOT NULL,
        role VARCHAR(200) NOT NULL,
        startDate DATE,
        endDate DATE,
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add user profile columns if not exist (major, graduationYear, gpa)
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS major VARCHAR(200);
    `).catch(() => {});
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS "graduationYear" INTEGER;
    `).catch(() => {});
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS gpa DECIMAL(3,2);
    `).catch(() => {});

    // Semester timetable (weekly schedule slots per semester): dayOfWeek 1=Mon .. 7=Sun
    await pool.query(`
      CREATE TABLE IF NOT EXISTS semester_timetable (
        id SERIAL PRIMARY KEY,
        semesterId INTEGER NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
        dayOfWeek INTEGER NOT NULL,
        startTime VARCHAR(10) NOT NULL,
        endTime VARCHAR(10) NOT NULL,
        courseLabel VARCHAR(200) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

// Export pool and init function
module.exports = { pool, initializeDatabase };
