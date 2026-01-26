import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.postgresql//postgres:KDkQwRAtaJPQyqsUahaLWMWZbIZcqnYP@postgres.railway.internal:5432/railway,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

const { Pool } = require('pg');

// Load env vars only if not in production (Railway/deployment)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

// Export pool and init function
module.exports = { pool, initializeDatabase };
