# Purdue Project - PostgreSQL + Railway Setup Guide

## Overview
This guide will help you set up the Purdue Project with PostgreSQL database using Railway.

## Prerequisites
- Node.js 16+
- PostgreSQL 14+ (for local development)
- Railway account (https://railway.app)
- Git

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Set Up Local PostgreSQL
Create a `.env.local` file in the root directory (already created, but update the DATABASE_URL):

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/semester_planner
NODE_ENV=development
PORT=5000
REACT_APP_API_URL=http://localhost:5000
```

### 3. Initialize Database
```bash
cd server
node db.js
```

This creates all necessary tables for the application.

### 4. Run Local Development
```bash
# Terminal 1: Start the server
npm run server

# Terminal 2: Start the client
npm run client
```

The app will be available at `http://localhost:3000`

---

## Railway PostgreSQL Setup

### 1. Create Railway Project
1. Go to https://railway.app
2. Click "Create New Project"
3. Select "Database" → "PostgreSQL"
4. Railway will provision a PostgreSQL instance

### 2. Get Database URL
In Railway dashboard:
1. Go to your PostgreSQL service
2. Click "Connect"
3. Copy the "Database URL" (looks like: `postgresql://user:password@host:port/database`)

### 3. Deploy with Railway

#### Option A: Railway CLI (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link project
railway link

# Set environment variables
railway variables set DATABASE_URL "your-database-url-from-railway"

# Deploy
railway up
```

#### Option B: Manual Deploy via GitHub
1. Push your code to GitHub
2. In Railway dashboard, create new service
3. Select "GitHub Repo"
4. Authorize and select this repository
5. In "Environment" tab, add:
   - `DATABASE_URL`: Your PostgreSQL URL
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Railway auto-deploys on push

### 4. Initialize Remote Database
After first deployment:
```bash
# Via Railway CLI
railway run node server/db.js
```

This will create all tables in your Railway PostgreSQL database.

---

## Project Structure

```
purdue-project/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Main server file
│   ├── db.js              # Database setup & pool
│   ├── routes/            # API endpoints
│   ├── models/            # Data models
│   └── package.json
├── .env.local             # Local env variables
├── railway.yml            # Railway config
├── vercel.json            # Vercel config (optional)
└── package.json           # Root package
```

---

## API Endpoints

The server provides RESTful APIs for:
- **Authentication**: Login, Signup
- **Courses**: Get, Create, Update, Delete
- **Semesters**: Manage semesters and enrollment
- **Schedule**: View and manage class schedule
- **Internships**: Track internship experiences

See `server/routes/` for detailed endpoint documentation.

---

## Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: 
- Check PostgreSQL is running locally: `psql --version`
- Verify DATABASE_URL in .env.local
- For Railway: Verify DATABASE_URL is set in Railway dashboard

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: 
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `REACT_APP_API_URL` | API base URL | `http://localhost:5000` |

---

## Database Schema

The app creates these tables automatically:

- **users**: User accounts and authentication
- **semesters**: Academic semesters
- **courses**: Available courses
- **user_schedule**: Student enrollments
- **internships**: Internship/co-op tracking

---

## Next Steps

1. ✅ Set up Railway PostgreSQL
2. ✅ Deploy with Railway CLI or GitHub
3. ✅ Initialize database tables
4. ✅ Test API endpoints
5. Configure frontend to use production API URL
6. Monitor Railway dashboard for logs and performance

---

## Support

For issues:
- Check Railway documentation: https://docs.railway.app
- PostgreSQL docs: https://www.postgresql.org/docs
- Express guides: https://expressjs.com/
