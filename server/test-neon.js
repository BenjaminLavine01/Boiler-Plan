const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Neon Connection...\n');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ Pool error:', err.message);
});

console.log('\n⏳ Attempting connection...');

pool.query('SELECT NOW() as current_time, version()', (err, res) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    console.error('Code:', err.code);
  } else {
    console.log('✅ Connection successful!');
    console.log('Time:', res.rows[0].current_time);
    console.log('PostgreSQL Version:', res.rows[0].version.split(',')[0]);
    
    // Test if users table exists
    pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')", (err, res) => {
      if (err) {
        console.error('❌ Table check failed:', err.message);
      } else {
        console.log('✅ Users table exists:', res.rows[0].exists);
      }
      pool.end();
      process.exit(0);
    });
  }
});

setTimeout(() => {
  console.error('❌ Connection timeout - Neon unreachable');
  pool.end();
  process.exit(1);
}, 10000);
