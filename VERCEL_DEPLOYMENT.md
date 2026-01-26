# Vercel + Railway Deployment Guide

This guide explains how to deploy the Purdue Project using **Vercel** for frontend and backend, and **Railway** for PostgreSQL database.

## 📚 Quick Start

- **New to Vercel?** Start with **[VERCEL_STEP_BY_STEP.md](./VERCEL_STEP_BY_STEP.md)** - Detailed walkthrough with every step explained
- **Need a quick reference?** Use **[VERCEL_QUICK_CHECKLIST.md](./VERCEL_QUICK_CHECKLIST.md)** - Checklist format for quick deployment
- **This guide** provides the overview and technical details

## Architecture Overview

- **Frontend**: React app deployed on Vercel
- **Backend**: Express API deployed as Vercel serverless functions
- **Database**: PostgreSQL hosted on Railway

## Prerequisites

- [Vercel account](https://vercel.com) (free tier available)
- [Railway account](https://railway.app) (free tier available)
- GitHub repository with your code
- Node.js 16+ installed locally (for testing)

---

## Step 1: Set Up PostgreSQL Database on Railway

### 1.1 Create Railway Project

1. Go to [Railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** or **"Empty Project"**
4. If empty, click **"+ New"** → **"Database"** → **"Add PostgreSQL"**

### 1.2 Get Database Connection String

1. Click on your PostgreSQL service
2. Go to the **"Variables"** tab
3. Find `DATABASE_URL` - this is your PostgreSQL connection string
4. Copy this value (format: `postgresql://user:password@host:port/database`)

### 1.3 Initialize Database Tables

You can initialize the database tables in two ways:

**Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run initialization script
railway run node server/db.js
```

**Option B: Using Railway Dashboard**
1. Go to your PostgreSQL service
2. Click **"Connect"** → **"Query"**
3. Run the SQL from `server/db.js` manually, or
4. Use the **"Data"** tab to run queries

---

## Step 2: Deploy Backend to Vercel

### 2.1 Deploy Backend as Separate Project (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - Go to **Settings** → **Environment Variables**
   - Add the following:
     ```
     DATABASE_URL = (your Railway PostgreSQL connection string)
     NODE_ENV = production
     ```
   - Make sure to add it for **Production**, **Preview**, and **Development** environments

6. Click **"Deploy"**

7. After deployment, note your backend URL (e.g., `https://your-backend.vercel.app`)

### 2.2 Alternative: Monorepo Deployment

If you prefer to deploy both frontend and backend from the root:

1. Import repository to Vercel
2. Configure:
   - **Root Directory**: (leave as root)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
3. Add environment variables as above
4. Vercel will use the root `vercel.json` to route requests

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Deploy Frontend as Separate Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository (same repo)
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   ```
   REACT_APP_API_URL = (your backend Vercel URL, e.g., https://your-backend.vercel.app)
   ```

6. Click **"Deploy"**

### 3.2 Update Frontend API Configuration

The frontend is already configured to use `REACT_APP_API_URL` from environment variables. Make sure this is set in Vercel.

---

## Step 4: Environment Variables Summary

### Backend (Vercel) Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Railway PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NODE_ENV` | Environment mode | `production` |

### Frontend (Vercel) Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://your-backend.vercel.app` |

### Railway PostgreSQL

Railway automatically provides:
- `DATABASE_URL` - Connection string for your database

---

## Step 5: Testing the Deployment

### 5.1 Test Backend

1. Visit `https://your-backend.vercel.app/api/health`
2. Should return: `{"status":"Server is running","database":"PostgreSQL"}`

### 5.2 Test Frontend

1. Visit your frontend URL
2. Try logging in or creating an account
3. Check browser console for any API errors

### 5.3 Test Database Connection

The backend will automatically initialize database tables on first request. Check Vercel function logs to verify database connection.

---

## Step 6: Local Development Setup

### 6.1 Create `.env.local` File

Create a `.env.local` file in the root directory:

```env
# PostgreSQL Database URL (from Railway)
DATABASE_URL=postgresql://user:password@host:port/database

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend API URL
REACT_APP_API_URL=http://localhost:5000
```

### 6.2 Run Locally

```bash
# Terminal 1: Start backend
cd server
npm install
npm start

# Terminal 2: Start frontend
cd client
npm install
npm start
```

---

## Troubleshooting

### Database Connection Issues

**Error**: `connect ECONNREFUSED` or `Connection timeout`

**Solutions**:
1. Verify `DATABASE_URL` is correctly set in Vercel environment variables
2. Check Railway PostgreSQL service is running
3. Ensure Railway database is publicly accessible (not just internal)
4. For Railway, use the **public** connection string, not the internal one

### CORS Errors

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**: The backend already has CORS enabled. Verify:
- Frontend `REACT_APP_API_URL` points to correct backend URL
- Backend is deployed and accessible

### Build Failures

**Error**: Build fails on Vercel

**Solutions**:
1. Check Vercel build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version (Vercel uses Node 18+ by default)
4. Check that build commands are correct

### Environment Variables Not Working

**Solutions**:
1. Ensure variables are set for the correct environment (Production/Preview/Development)
2. Redeploy after adding new environment variables
3. For React apps, variables must start with `REACT_APP_` to be accessible in the browser
4. Restart Vercel deployment after changing environment variables

### Database Tables Not Created

**Solution**: 
1. Check Vercel function logs for initialization errors
2. Manually run initialization:
   ```bash
   railway run node server/db.js
   ```
3. Or connect to Railway PostgreSQL and run the SQL manually

---

## Deployment Options Comparison

### Option 1: Separate Projects (Recommended)
- **Frontend**: Separate Vercel project from `client/` folder
- **Backend**: Separate Vercel project from `server/` folder
- **Pros**: Independent deployments, easier to manage
- **Cons**: Two separate projects to manage

### Option 2: Monorepo Deployment
- **Single Project**: Deploy from root with `vercel.json`
- **Pros**: Single project, unified deployment
- **Cons**: Both deploy together, less flexibility

---

## Next Steps

1. ✅ Set up Railway PostgreSQL
2. ✅ Deploy backend to Vercel
3. ✅ Deploy frontend to Vercel
4. ✅ Configure environment variables
5. ✅ Test all endpoints
6. Set up custom domains (optional)
7. Configure monitoring and logging
8. Set up CI/CD for automatic deployments

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions)

---

## Support

For issues:
- Check Vercel deployment logs
- Check Railway service logs
- Verify environment variables are set correctly
- Test database connection separately
