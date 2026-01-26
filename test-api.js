const http = require('http');

const data = JSON.stringify({
  email: 'newuser@test.com',
  password: 'password123',
  firstName: 'New',
  lastName: 'User'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Starting registration test...');
console.log('Sending:', data);

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${body}`);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error(`Connection Error: ${error.code} - ${error.message}`);
  console.error('Full error:', error);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('Request timeout');
  process.exit(1);
});

req.setTimeout(5000);
req.write(data);
req.end();
