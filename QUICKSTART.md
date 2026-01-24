# Quick Start Guide - BoilerPlan

## System Requirements
- Node.js 14+ 
- npm or yarn
- MongoDB Atlas account (free tier available)

---

## Installation & Setup

### 1. Clone the Repository
```bash
cd c:\Users\nguye\Desktop\GitHub\Purdue-Project
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3. Configure MongoDB

#### Get MongoDB URI:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier)
3. Create a database user with username & password
4. Click "Connect" → "Connect your application"
5. Copy the connection string

#### Update `.env` File:
```bash
# server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/semester-planner?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3000`

The app will automatically open in your browser!

---

## Testing the Application

### Create Test Account
1. Click "Get Started" or "Sign In"
2. Click "Create Account" tab
3. Fill in:
   - Name: Test User
   - Username: testuser
   - Email: test@purdue.edu
   - Major: Computer Science
   - Graduation Year: 2026
   - Password: password123

### Features to Test
- ✅ Create a semester (e.g., "Fall 2025")
- ✅ Browse course catalog by department
- ✅ Add an internship (e.g., Google - Summer 2025)
- ✅ Check analytics dashboard
- ✅ Update internship status
- ✅ Delete a semester

---

## Build for Production

### Build Frontend
```bash
cd client
npm run build
```
Creates optimized `build/` folder ready for deployment

### Build Backend
Backend is ready as-is. No build step needed.

---

## Deployment Options

### Option 1: Railway.app (Recommended)
```bash
npm install -g @railway/cli
railway login
railway init
railway variables set MONGODB_URI "your-mongodb-uri"
railway up
```

### Option 2: Vercel (Frontend) + Render (Backend)

**Frontend:**
- Push to GitHub
- Connect to [Vercel](https://vercel.com)
- Auto-deploys on push

**Backend:**
- Connect to [Render](https://render.com)
- Set environment variables
- Deploy

### Option 3: Heroku
```bash
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## Project Structure

```
Purdue-Project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── server/                # Express backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── README.md
├── FEATURES.md
├── DEPLOYMENT.md
└── .gitignore
```

---

## Troubleshooting

### MongoDB Connection Fails
```
Error: connect ECONNREFUSED
```
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for testing)
- Ensure credentials are correct

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
- Verify backend is running on port 5000
- Check frontend proxy in `client/package.json`
- Ensure CORS is enabled in server

### Port Already in Use
```bash
# Windows PowerShell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
```

---

## Environment Variables

### Server (.env)
```
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
NODE_ENV=development
```

### Client
No additional setup needed. Proxy is configured in `package.json`

---

## Development Tools

### VS Code Extensions Recommended
- REST Client (for testing APIs)
- MongoDB for VS Code
- Thunder Client (API testing)
- Prettier (code formatting)

### Useful Commands
```bash
# Run tests
npm test

# Build frontend
npm run build

# Check for errors
npm run lint

# Format code
npm run format
```

---

## API Testing

Use [Thunder Client](https://www.thunderclient.com) or [Postman](https://www.postman.com):

### Test Login
```
POST http://localhost:5000/api/auth/login
{
  "username": "testuser",
  "password": "password123"
}
```

### Create Semester
```
POST http://localhost:5000/api/semesters
{
  "name": "Fall 2025",
  "year": 2025,
  "season": "Fall"
}
```

---

## Next Steps

1. **Test locally** - Follow development setup
2. **Create GitHub repo** - Push your code
3. **Deploy** - Use Railway, Vercel, or Render
4. **Monitor** - Check logs for errors
5. **Iterate** - Add features & improvements

---

## Support & Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)

---

## Important Notes

⚠️ **Security**
- Never commit `.env` to git
- Keep passwords out of code
- Use environment variables for secrets
- Validate all user inputs on backend
- Use HTTPS in production

✅ **Best Practices**
- Test locally before deploying
- Check browser console for errors
- Monitor backend logs
- Keep dependencies updated
- Regular database backups

---

**Happy Planning! 🎓**
