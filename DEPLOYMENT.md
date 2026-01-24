# Deployment Guide - Semester Planner

Your project is now ready to publish! Choose your preferred hosting platform below.

## **Option 1: Railway.app (RECOMMENDED) ⭐**

### Benefits:
- Free tier available
- Auto-deploys from GitHub
- Built-in MongoDB support
- Simple configuration

### Steps:

1. **Create a GitHub repository:**
   ```bash
   git remote add origin https://github.com/yourusername/Purdue-Project.git
   git branch -M main
   git push -u origin main
   ```

2. **Go to [railway.app](https://railway.app)**
   - Sign up with GitHub
   - Click "Create New Project"
   - Select "Deploy from GitHub repo"
   - Connect your Purdue-Project repository

3. **Railway will auto-detect and deploy:**
   - It reads `railway.yml` automatically
   - Deploys both frontend and backend
   - Sets up MongoDB

4. **Add MongoDB Connection String:**
   - In Railway dashboard, go to Variables
   - Add `MONGODB_URI` with your MongoDB Atlas connection string

5. **Your app will be live at:** `https://yourproject-prod.up.railway.app`

---

## **Option 2: Vercel (Frontend) + Render (Backend)**

### Frontend on Vercel:

1. Push to GitHub (see Option 1, step 1)
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Vercel auto-deploys frontend

### Backend on Render:

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production

---

## **Option 3: Heroku Alternative (Render.com)**

1. Sign up at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

---

## **Before Deploying - IMPORTANT:**

### ⚠️ Security Checklist:

1. **Reset MongoDB Password:**
   - Go to MongoDB Atlas → Security → Database Access
   - Click the pencil icon on your user
   - Change password
   - Update `.env` with new credentials

2. **Never commit `.env`:**
   ```bash
   # This is already in .gitignore, but verify
   cat .gitignore | grep "^\.env"
   ```

3. **Update `.env.example`:**
   - Remove actual credentials
   - Keep it as a template

---

## **Testing Before Publish:**

### Test Locally:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Visit `http://localhost:3000` and test:
- Create a semester
- Add courses
- Edit courses
- Delete courses
- Verify GPA calculation

---

## **Environment Variables Needed:**

### MongoDB URI Format:
```
mongodb+srv://username:password@cluster-name.mongodb.net/semester-planner?retryWrites=true&w=majority
```

Get this from:
1. MongoDB Atlas Dashboard
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>`

---

## **Quick Deploy with Railway (Recommended)**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize Railway project
railway init

# 4. Link your MongoDB URI
railway variables set MONGODB_URI "your-mongodb-uri"

# 5. Deploy
railway up
```

---

## **Post-Deployment:**

1. **Test your live app:**
   - Visit the deployed URL
   - Test all features
   - Check browser console for errors

2. **Monitor logs:**
   - Railway Dashboard → Logs tab
   - Check for any runtime errors

3. **Update DNS (if custom domain):**
   - Point your domain to the provider's servers
   - Can take 24-48 hours to propagate

---

## **Common Issues:**

### MongoDB Connection Fails:
- Check connection string
- Verify IP whitelist in MongoDB Atlas (allow all IPs during testing)
- Ensure database user has correct password

### Frontend not loading:
- Check that backend URL is correct in frontend
- Verify CORS settings in backend

### Build fails:
- Ensure all dependencies are in `package.json`
- Check Node version (should be 14+)

---

## **Support & Resources:**

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [React Deployment](https://create-react-app.dev/deployment)

**Your app is production-ready! Choose your platform and deploy!** 🚀
