# Vercel Deployment Quick Checklist

Use this as a quick reference while deploying. For detailed instructions, see `VERCEL_STEP_BY_STEP.md`.

---

## ✅ Pre-Deployment Checklist

- [ ] GitHub repository is pushed and up to date
- [ ] Railway PostgreSQL is set up
- [ ] Railway `DATABASE_URL` is copied
- [ ] Vercel account is created

---

## 🚀 Backend Deployment Checklist

### Step 1: Create Project
- [ ] Go to Vercel Dashboard → Add New → Project
- [ ] Import GitHub repository
- [ ] Framework Preset: **Other**
- [ ] Root Directory: **`server`**
- [ ] Build Command: **(empty)**
- [ ] Output Directory: **(empty)**
- [ ] Install Command: **`npm install`**

### Step 2: Add Environment Variables
- [ ] `DATABASE_URL` = (your Railway PostgreSQL URL)
- [ ] `NODE_ENV` = `production`
- [ ] Both checked for: Production, Preview, Development

### Step 3: Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Copy backend URL: `https://your-backend.vercel.app`
- [ ] Test: Visit `/api/health` endpoint

---

## 🎨 Frontend Deployment Checklist

### Step 1: Create Project
- [ ] Go to Vercel Dashboard → Add New → Project
- [ ] Import **same** GitHub repository
- [ ] Framework Preset: **Create React App**
- [ ] Root Directory: **`client`**
- [ ] Build Command: **`npm run build`**
- [ ] Output Directory: **`build`**
- [ ] Install Command: **`npm install`**

### Step 2: Add Environment Variable
- [ ] `REACT_APP_API_URL` = `https://your-backend.vercel.app`
- [ ] Checked for: Production, Preview, Development

### Step 3: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Copy frontend URL
- [ ] Test: Visit frontend URL and try logging in

---

## 🔍 Verification Checklist

- [ ] Backend health check works: `/api/health`
- [ ] Frontend loads without errors
- [ ] Can create user account (tests database connection)
- [ ] No CORS errors in browser console
- [ ] No 404 errors for API calls

---

## 📋 Environment Variables Reference

### Backend (Vercel)
```
DATABASE_URL = postgresql://postgres:password@host:port/database
NODE_ENV = production
```

### Frontend (Vercel)
```
REACT_APP_API_URL = https://your-backend.vercel.app
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check Root Directory is correct (`server` or `client`) |
| Environment variable not found | Add in Settings → Environment Variables, then redeploy |
| Frontend can't connect | Verify `REACT_APP_API_URL` is your backend URL |
| Database error | Check `DATABASE_URL` is correct Railway public URL |

---

## 📞 Where to Find Things

### Vercel Dashboard
- **Projects**: https://vercel.com/dashboard
- **Environment Variables**: Project → Settings → Environment Variables
- **Deployment Logs**: Project → Click on deployment → View Logs

### Railway Dashboard
- **Projects**: https://railway.app
- **DATABASE_URL**: Project → PostgreSQL → Variables tab

---

**Need detailed instructions?** See `VERCEL_STEP_BY_STEP.md`
