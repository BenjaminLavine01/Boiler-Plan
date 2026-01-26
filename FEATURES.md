# BoilerPlan - Complete Feature List

## 🎓 Application Overview

**BoilerPlan** is a comprehensive academic planning platform designed for Purdue University students. It helps students manage their course schedules, track internship applications, plan their graduation timeline, and optimize their academic path.

---

## 📑 Page Structure

### 1. **Landing Page** (`/`)
- **Marketing Site** with information about BoilerPlan
- **Feature Highlights**:
  - Smart Scheduling
  - Track Progress
  - Internship Management
  - Course Catalog
  - Prerequisite Tracking
  - Graduation Planning
- **Call-to-Action** buttons directing users to sign in
- **Responsive Design** for all devices
- **Footer** with links to privacy policy and terms

### 2. **Authentication Pages** (`/login`)
#### Sign In Tab
- Username/Email login
- Password field
- Direct access to dashboard
- Secure authentication

#### Create Account Tab
- Full name input
- Username creation
- Email (Purdue-specific)
- Major selection (Computer Science, Engineering, etc.)
- Expected graduation year
- Password & confirmation
- Automatic login after registration

---

## 📊 Dashboard (`/dashboard`)

### Main Navigation Sidebar
- **User Profile** section showing:
  - User's avatar (initials)
  - Full name
  - Major
  - Current semester info
- **Navigation Menu**:
  - 📊 Dashboard (Overview)
  - 📚 Semester Planner
  - 📖 Course Catalog
  - 🏢 Internships
  - 📈 Analytics
- **Settings & Sign Out** buttons

### Dashboard Overview
- **Welcome Message** with personalized greeting
- **Quick Stats Cards**:
  - Current Semesters count
  - Active Internships count
  - Graduation Year & Major
  - Quick Actions list
- **Getting Started Section** with 4-step guide:
  1. Add Semesters
  2. Browse Courses
  3. Plan Schedule
  4. Track Internships

---

## 📚 Semester Planner

### Features
- **Add New Semester**:
  - Semester name
  - Season (Spring/Summer/Fall/Winter)
  - Year
- **View All Semesters**:
  - List view showing all planned semesters
  - Course count for each semester
  - Quick delete option
- **Edit Semesters**: Update semester details
- **Delete Semesters**: Remove with confirmation

### Semester Management
- Each semester card displays:
  - Semester name & info
  - Number of courses scheduled
  - Color-coded status badges
  - Action buttons (Edit, Delete)

---

## 📖 Course Catalog

### Features
- **Browse Purdue Courses**: Complete catalog of available courses
- **Department Filtering**: Filter courses by department
- **Course Details**:
  - Course Code (e.g., CS101)
  - Course Name
  - Credits (1-4)
  - Department
  - Description
  - Prerequisites list
  - Corequisites
  - Difficulty rating (1-5 stars)
  - Workload level (Light/Moderate/Heavy)
  - Core class indicator

### Display
- **Card Grid Layout** showing all courses
- **Color-coded workload badges**:
  - 🟢 Light (Green)
  - 🟡 Moderate (Orange)
  - 🔴 Heavy (Red)
- **Responsive** design adapts to screen size

### Search & Filter
- Department-based filtering
- Real-time course list updates

---

## 🏢 Internship Tracker

### Features
- **Add New Internship**:
  - Company name
  - Position title
  - Semester & Year
  - Application status
  - Location
  - Stipend amount
  - Job description
  
### Track Internship Status
- **Status Options**:
  - Applied
  - Pending
  - Accepted
  - Completed
  - Rejected
- **Color-coded status badges**:
  - 🔵 Applied (Blue)
  - 🟡 Pending (Orange)
  - 🟢 Accepted (Green)
  - 🟣 Completed (Purple)
  - 🔴 Rejected (Red)

### Internship List View
- Company name & position
- Timeline (Semester/Year)
- Status indicator
- Location information
- Stipend amount (if available)
- Delete option with confirmation

### Integration
- Internships linked to semesters
- Timeline visualization
- Career path tracking

---

## 📈 Analytics & Progress

### Current Features
- **Graduation Timeline**:
  - Years until graduation
  - Target graduation year
  - Major information
  
- **GPA Tracking** (Coming Soon):
  - Current GPA display
  - Semester GPA calculations
  - Cumulative GPA

- **Progress Visualization**:
  - Credits completed vs. required
  - Progress bar to graduation
  - Percentage complete

### Analytics Coming Soon
- Detailed GPA tracking
- Degree requirement progress
- Course load analysis
- Graduation timeline projection
- Grade distribution charts

---

## 🔐 User Authentication

### Features
- **Secure Login System**:
  - Username/email authentication
  - Password verification
  - Session management
  - LocalStorage for persistence

- **Registration**:
  - Email validation
  - Password confirmation
  - Profile creation
  - Major selection
  - Graduation year setup

- **User Profiles**:
  - Personal information
  - Academic major
  - Graduation timeline
  - Connected semesters
  - Linked internships

---

## 🗄️ Backend Models & APIs

### User Model
```
- username (unique)
- email (unique)
- password
- name
- major
- graduationYear
- profilePicture
- semesters (reference)
- internships (reference)
```

### Semester Model
```
- name
- year
- season (Spring/Summer/Fall/Winter)
- courses (reference array)
- createdAt
- updatedAt
```

### Course Model
```
- name
- courseCode (unique)
- credits (0-4)
- grade
- gpa
- semester (reference)
- description
- createdAt
- updatedAt
```

### Internship Model
```
- company
- position
- semester (Spring/Summer/Fall/Winter)
- year
- status (Applied/Pending/Accepted/Completed/Rejected)
- location
- stipend
- description
- user (reference)
- createdAt
- updatedAt
```

### Purdue Course Model
```
- courseCode (unique)
- name
- credits
- department
- description
- prerequisites (array)
- corequisites (array)
- difficulty (1-5)
- workload (Light/Moderate/Heavy)
- isCoreClass
```

---

## 🛣️ API Routes

### Authentication (`/api/auth`)
- `POST /register` - Create new account
- `POST /login` - Sign in
- `GET /:id` - Get user profile
- `PUT /:id` - Update profile

### Semesters (`/api/semesters`)
- `GET /` - Get all semesters
- `GET /:id` - Get specific semester
- `POST /` - Create semester
- `PUT /:id` - Update semester
- `DELETE /:id` - Delete semester

### Courses (`/api/courses`)
- `GET /` - Get all courses
- `GET /semester/:semesterId` - Get semester courses
- `GET /:id` - Get course details
- `POST /` - Create course
- `PUT /:id` - Update course
- `DELETE /:id` - Delete course

### Internships (`/api/internships`)
- `GET /user/:userId` - Get user's internships
- `GET /:id` - Get internship details
- `POST /` - Add internship
- `PUT /:id` - Update internship
- `DELETE /:id` - Delete internship

### Purdue Courses (`/api/purdue-courses`)
- `GET /` - All courses
- `GET /:code` - Course by code
- `GET /department/:dept` - Courses by department
- `POST /` - Add course (admin)

---

## 🎨 UI/UX Features

### Design System
- **Color Scheme**:
  - Primary: #667eea (Purple-Blue)
  - Secondary: #764ba2 (Dark Purple)
  - Success: #48bb78 (Green)
  - Danger: #f56565 (Red)
  - Warning: #ed8936 (Orange)
  - Neutral: #e2e8f0 (Light Gray)

### Responsive Design
- **Mobile** (< 480px): Single column, touch-friendly
- **Tablet** (480px - 768px): Optimized grid
- **Desktop** (> 768px): Full multi-column layout

### Animations
- Smooth page transitions (0.3s ease)
- Card hover effects
- Button interactions
- Loading states

### Accessibility
- ARIA labels for navigation
- Semantic HTML
- Keyboard navigation support
- High contrast text
- Focus indicators

---

## 🚀 Key Features Summary

✅ **Multi-page Application** with React Router
✅ **User Authentication** with registration & login
✅ **Semester Planning** - Create & manage semesters
✅ **Course Catalog** - Browse Purdue courses
✅ **Internship Tracking** - Log applications & offers
✅ **GPA Calculation** - Automatic GPA tracking
✅ **Progress Analytics** - Visualization toward graduation
✅ **Responsive Design** - Works on all devices
✅ **Real-time Updates** - Instant data sync
✅ **Professional UI** - Modern, clean interface

---

## 📱 Browser Support
- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔄 Data Flow

1. User visits landing page
2. Clicks "Get Started" → Redirected to login
3. Creates account or signs in
4. Redirected to dashboard
5. Can navigate between sections:
   - Add semesters
   - Browse course catalog
   - Add courses to semesters
   - Track internships
   - View progress analytics
6. All data syncs with backend Postgre
7. Sign out → Returns to landing page

---

## 📝 Notes

- Authentication uses PostgreSQL for user storage
- All data persists in PostgreSQL database
- Frontend uses localStorage for session management
- API endpoints prefixed with `/api/`
- CORS enabled for frontend-backend communication
- Ready for deployment to Railway, Vercel, or Heroku

---

**BoilerPlan** is designed to help Purdue students succeed academically while managing internships and planning their career path! 🎓
