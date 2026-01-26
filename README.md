# BoilerPlan - PostgreSQL Edition

A full-stack semester planning application built with React, Express.js, and PostgreSQL. Plan your academic courses, track your grades, and calculate your GPA with ease.

## Features

- **Semester Management**: Create and manage multiple semesters
- **Course Tracking**: Add courses with credits, grades, and descriptions
- **GPA Calculation**: Automatic GPA calculation based on grades and credits
- **Course Editing**: Edit course details and grades
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: All changes sync immediately across the app

## Tech Stack

### Frontend
- React 18
- Axios (HTTP client)
- CSS3 for styling

### Backend
- Node.js
- Express.js
- PostgreSQL database
- CORS support

## Project Structure

```
Semester-Planner-MongoDB/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── CourseForm.js
│   │   │   ├── CourseList.js
│   │   │   ├── SemesterForm.js
│   │   │   └── SemesterList.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── server/                 # Express backend
    ├── models/            # MongoDB schemas
    │   ├── Course.js
    │   └── Semester.js
    ├── routes/            # API routes
    │   ├── courses.js
    │   └── semesters.js
    ├── index.js
    ├── package.json
    └── .env.example
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Setup Instructions

1. **Clone the repository** (if applicable)
   ```bash
   cd Semester-Planner-MongoDB
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure MongoDB**
   - Create a `.env` file in the `server` folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/semester-planner?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```
   - Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

## Running the Application

### Start the Backend Server
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```
The server will run on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd client
npm start
```
The app will run on `http://localhost:3000` and automatically open in your browser

## API Endpoints

### Semesters
- `GET /api/semesters` - Get all semesters
- `GET /api/semesters/:id` - Get a specific semester
- `POST /api/semesters` - Create a new semester
- `PUT /api/semesters/:id` - Update a semester
- `DELETE /api/semesters/:id` - Delete a semester

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/semester/:semesterId` - Get courses for a specific semester
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

## Database Schema

### Semester Model
```javascript
{
  name: String,
  year: Number,
  season: String (Spring|Summer|Fall|Winter),
  courses: [ObjectId], // references to Course documents
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  name: String,
  courseCode: String,
  credits: Number (0-4),
  grade: String (A+|A|A-|B+|B|B-|C+|C|C-|D+|D|D-|F|Not Graded),
  gpa: Number (0-4),
  semester: ObjectId, // reference to Semester
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage

1. **Create a Semester**: Click "Add Semester" and enter the semester details
2. **Select a Semester**: Click on a semester to view its courses
3. **Add Courses**: With a semester selected, click "Add Course" to add a new course
4. **Edit Course**: Click "Edit" on a course to modify its details
5. **Delete**: Use the Delete button to remove semesters or courses

## GPA Calculation

The app automatically calculates GPA using the standard 4.0 scale:
- A+/A: 4.0
- A-: 3.7
- B+: 3.3
- B: 3.0
- B-: 2.7
- C+: 2.3
- C: 2.0
- C-: 1.7
- D+: 1.3
- D: 1.0
- D-: 0.7
- F: 0.0

## Deployment

### Deploying the Backend
Consider using:
- Heroku
- Railway
- Render
- AWS EC2

### Deploying the Frontend
Consider using:
- Vercel
- Netlify
- GitHub Pages

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string in `.env`
- Ensure your MongoDB Atlas IP whitelist includes your current IP
- Check if MongoDB Atlas cluster is active

### CORS Errors
- Ensure the backend is running on port 5000
- Check that the `proxy` setting in `client/package.json` matches your backend URL

### Port Already in Use
```bash
# Find and kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## Future Enhancements

- User authentication and accounts
- Grade statistics and analytics
- Course prerequisites tracking
- Schedule builder
- Dark mode
- Export transcripts to PDF
- Mobile app (React Native)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.
