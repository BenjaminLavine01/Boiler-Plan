# Step-by-Step Vercel Deployment Guide

This is a detailed, beginner-friendly guide that walks you through every click and action needed to deploy your backend and frontend to Vercel.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ A GitHub account
- ✅ Your code pushed to a GitHub repository
- ✅ A Vercel account (sign up at https://vercel.com - it's free)
- ✅ A Railway account with PostgreSQL set up (sign up at https://railway.app - it's free)
- ✅ Your Railway PostgreSQL `DATABASE_URL` connection string

---

## Part 1: Get Your Railway Database URL

### Step 1.1: Access Railway Dashboard

1. Go to **https://railway.app**
2. **Sign in** with your GitHub account (or create an account)
3. You'll see your **Dashboard** with your projects

### Step 1.2: Find Your PostgreSQL Service

1. Click on your **project** (or create a new one if you haven't)
2. You should see a **PostgreSQL** service card
3. **Click on the PostgreSQL service** to open it

### Step 1.3: Copy the DATABASE_URL

1. Click on the **"Variables"** tab (at the top of the page)
2. Look for a variable named **`DATABASE_URL`**
3. You'll see the value looks like: `postgresql://postgres:password@host:port/database`
4. **Click the copy icon** (📋) next to the value to copy it
5. **Save this somewhere safe** - you'll need it in a few steps!

**Example format:**
```
postgresql://postgres:ABC123xyz@switchback.proxy.rlwy.net:23235/railway
```

---

## Part 2: Deploy Backend to Vercel

### Step 2.1: Go to Vercel Dashboard

1. Open a new tab and go to **https://vercel.com**
2. **Sign in** with your GitHub account (or create an account)
3. You'll see your **Dashboard**

### Step 2.2: Create a New Project

1. Click the **"Add New..."** button (usually in the top right or center)
2. From the dropdown menu, click **"Project"**
3. You'll see a page titled **"Import Git Repository"**

### Step 2.3: Import Your GitHub Repository

1. You'll see a list of your GitHub repositories
2. **Find your repository** (the one containing your Purdue Project code)
3. If you don't see it:
   - Click **"Adjust GitHub App Permissions"**
   - Make sure the repository is selected
   - Click **"Save"** and refresh
4. **Click on your repository** to select it
5. Click the **"Import"** button at the bottom

### Step 2.4: Configure Project Settings

After clicking Import, you'll see the **"Configure Project"** page. Here's what to fill in:

#### Framework Preset
- **Click the dropdown** that says "Framework Preset"
- Select **"Other"** (or scroll down and select it)

#### Root Directory
- **Click "Edit"** next to "Root Directory"
- Type: `server`
- Click **"Continue"** or **"Save"**

#### Build and Output Settings
- **Build Command**: Leave this **empty** (or delete any default value)
- **Output Directory**: Leave this **empty** (or delete any default value)
- **Install Command**: Type: `npm install`

#### Project Name (Optional)
- You can change the project name if you want (e.g., "purdue-backend")
- Or leave it as the default repository name

### Step 2.5: Add Environment Variables

**IMPORTANT:** Do this BEFORE clicking Deploy!

1. Scroll down to the **"Environment Variables"** section
2. You'll see a form with fields:
   - **Key** (text input)
   - **Value** (text input)
   - **Environment** checkboxes (Production, Preview, Development)

3. **Add DATABASE_URL:**
   - **Key**: Type `DATABASE_URL`
   - **Value**: Paste your Railway PostgreSQL connection string (the one you copied earlier)
   - **Check all three boxes**: ☑ Production ☑ Preview ☑ Development
   - Click **"Add"** or the **"+"** button

4. **Add NODE_ENV:**
   - **Key**: Type `NODE_ENV`
   - **Value**: Type `production`
   - **Check all three boxes**: ☑ Production ☑ Preview ☑ Development
   - Click **"Add"** or the **"+"** button

**Your Environment Variables should look like this:**
```
DATABASE_URL = postgresql://postgres:...@host:port/database
  ☑ Production  ☑ Preview  ☑ Development

NODE_ENV = production
  ☑ Production  ☑ Preview  ☑ Development
```

### Step 2.6: Deploy the Backend

1. Scroll to the bottom of the page
2. Click the big **"Deploy"** button
3. You'll see a deployment in progress
4. **Wait 1-2 minutes** for the deployment to complete
5. When it says **"Ready"** or shows a green checkmark ✅, your backend is deployed!

### Step 2.7: Get Your Backend URL

1. After deployment completes, you'll see a page with your project details
2. Look for a section that shows your **deployment URL**
3. It will look like: `https://your-project-name.vercel.app` or `https://your-project-name-abc123.vercel.app`
4. **Copy this URL** - you'll need it for the frontend!
5. **Test it**: Open a new tab and visit `https://your-backend-url.vercel.app/api/health`
   - You should see: `{"status":"Server is running","database":"PostgreSQL"}`

**✅ Backend Deployment Complete!**

---

## Part 3: Deploy Frontend to Vercel

### Step 3.1: Create Another Vercel Project

1. Go back to your **Vercel Dashboard** (click the Vercel logo or "Dashboard" in the top left)
2. Click **"Add New..."** → **"Project"** again
3. You'll see the **"Import Git Repository"** page again

### Step 3.2: Import the Same Repository

1. **Select the same GitHub repository** (yes, the same one!)
2. Click **"Import"**

### Step 3.3: Configure Frontend Project Settings

On the **"Configure Project"** page:

#### Framework Preset
- **Click the dropdown**
- Select **"Create React App"** (Vercel should auto-detect this)

#### Root Directory
- **Click "Edit"** next to "Root Directory"
- Type: `client`
- Click **"Continue"** or **"Save"**

#### Build and Output Settings
- **Build Command**: Type: `npm run build`
- **Output Directory**: Type: `build`
- **Install Command**: Type: `npm install` (or leave default)

#### Project Name (Optional)
- Change to something like "purdue-frontend" or leave as default

### Step 3.4: Add Frontend Environment Variable

1. Scroll down to **"Environment Variables"**
2. **Add REACT_APP_API_URL:**
   - **Key**: Type `REACT_APP_API_URL`
   - **Value**: Paste your **backend Vercel URL** (the one you copied in Step 2.7)
     - Example: `https://your-backend.vercel.app`
     - **Important:** Make sure it starts with `https://` and doesn't have `/api` at the end
   - **Check all three boxes**: ☑ Production ☑ Preview ☑ Development
   - Click **"Add"**

**Your Environment Variable should look like:**
```
REACT_APP_API_URL = https://your-backend.vercel.app
  ☑ Production  ☑ Preview  ☑ Development
```

### Step 3.5: Deploy the Frontend

1. Scroll to the bottom
2. Click **"Deploy"**
3. **Wait 2-3 minutes** for the build to complete (React apps take longer to build)
4. When it says **"Ready"** ✅, your frontend is deployed!

### Step 3.6: Test Your Frontend

1. Copy your **frontend deployment URL** (shown after deployment)
2. Open it in a new browser tab
3. Your app should load!
4. Try creating an account or logging in to test the connection to your backend

**✅ Frontend Deployment Complete!**

---

## Part 4: Verify Everything Works

### Test 1: Backend Health Check
1. Visit: `https://your-backend-url.vercel.app/api/health`
2. Should return: `{"status":"Server is running","database":"PostgreSQL"}`

### Test 2: Frontend Loads
1. Visit your frontend URL
2. The page should load without errors
3. Check browser console (F12) for any errors

### Test 3: Database Connection
1. Try creating a user account on your frontend
2. If it works, your database connection is working!

---

## 🔧 Common Issues & Solutions

### Issue 1: "Build Failed" Error

**What to check:**
1. Go to your project in Vercel
2. Click on the failed deployment
3. Click **"View Build Logs"**
4. Look for error messages

**Common fixes:**
- Make sure **Root Directory** is set correctly (`server` for backend, `client` for frontend)
- Check that all dependencies are in `package.json`
- Verify the **Build Command** is correct

### Issue 2: "Environment Variable Not Found"

**Solution:**
1. Go to your project → **Settings** → **Environment Variables**
2. Make sure the variable is added
3. Make sure all environment checkboxes are checked
4. **Redeploy** after adding variables

### Issue 3: Frontend Can't Connect to Backend

**Check:**
1. Verify `REACT_APP_API_URL` in frontend environment variables
2. Make sure it's your **backend URL** (not frontend URL)
3. Make sure it starts with `https://`
4. Test backend URL directly: `https://your-backend.vercel.app/api/health`

### Issue 4: Database Connection Error

**Check:**
1. Verify `DATABASE_URL` in backend environment variables
2. Make sure it's the **public** Railway URL (not internal)
3. Test the connection string format
4. Check Railway PostgreSQL service is running

---

## 📝 Quick Reference: Environment Variables

### Backend Project (Vercel)
```
DATABASE_URL = postgresql://postgres:password@host:port/database
NODE_ENV = production
```

### Frontend Project (Vercel)
```
REACT_APP_API_URL = https://your-backend.vercel.app
```

---

## 🎉 You're Done!

Your app is now live on Vercel:
- **Backend**: `https://your-backend.vercel.app`
- **Frontend**: `https://your-frontend.vercel.app`

Every time you push to GitHub, Vercel will automatically redeploy your changes!

---

## 📚 Next Steps

1. **Custom Domain**: Add your own domain in Vercel Settings
2. **Monitor Logs**: Check Vercel function logs for debugging
3. **Set up CI/CD**: Already done! Just push to GitHub
4. **Database Management**: Use Railway dashboard to view/manage data

---

## Need Help?

- Check Vercel deployment logs
- Check Railway service logs
- Verify environment variables are set correctly
- Test each component separately (backend health check, frontend load)
