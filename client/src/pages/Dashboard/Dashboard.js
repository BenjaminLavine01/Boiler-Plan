import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import './Dashboard.css';
import DashboardNav from './DashboardNav';
import SemesterPlanner from './SemesterPlanner';
import CourseCatalog from './CourseCatalog';
import InternshipTracker from './InternshipTracker';
import Analytics from './Analytics';

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`dashboard dashboard-${theme}`}>
      <DashboardNav 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />

      <div className="dashboard-main">
        {activeSection === 'overview' && <Overview user={user} />}
        {activeSection === 'semester-planner' && <SemesterPlanner user={user} />}
        {activeSection === 'courses' && <CourseCatalog />}
        {activeSection === 'internships' && <InternshipTracker user={user} />}
        {activeSection === 'analytics' && <Analytics user={user} />}
        {activeSection === 'settings' && <SettingsSection theme={theme} onToggleTheme={toggleTheme} user={user} />}
      </div>
    </div>
  );
}

function Overview({ user }) {
  const displayName = user.firstName || user.name || 'User';
  const graduationYear = user.graduationYear || new Date().getFullYear() + 4;
  const yearsUntilGraduation = Math.max(0, graduationYear - new Date().getFullYear());

  return (
    <div className="overview">
      <div className="welcome-section">
        <h1>Welcome Back, {displayName}! 🎓</h1>
        <p>You're {yearsUntilGraduation} year{yearsUntilGraduation !== 1 ? 's' : ''} away from graduation</p>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <h3>📚 Current Semesters</h3>
          <p className="stat">{user.semesters?.length ?? 0}</p>
          <small>Total semesters planned</small>
        </div>

        <div className="overview-card">
          <h3>🏢 Internships</h3>
          <p className="stat">{user.internships?.length ?? 0}</p>
          <small>Total internships tracked</small>
        </div>

        <div className="overview-card">
          <h3>📊 Graduation Year</h3>
          <p className="stat">{graduationYear}</p>
          <small>{user.major || 'Plan your path'}</small>
        </div>

        <div className="overview-card">
          <h3>⚡ Quick Actions</h3>
          <ul className="quick-actions">
            <li>✓ Plan a semester</li>
            <li>✓ Browse courses</li>
            <li>✓ Track internships</li>
          </ul>
        </div>
      </div>

      <div className="overview-section">
        <h2>Getting Started</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Add Your Semesters</h3>
            <p>Start planning by creating semesters. Go to Semester Planner to add your first semester.</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Course Catalog</h3>
            <p>Explore the Purdue course catalog to find courses that fit your major and interests.</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Plan Your Schedule</h3>
            <p>Add courses to your semesters while checking prerequisites and managing your GPA.</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Internships</h3>
            <p>Log your internship applications and offers to integrate them with your academic plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({ theme, onToggleTheme, user }) {
  return (
    <div className="settings-section">
      <div className="section-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      <div className="settings-cards">
        <div className="settings-card">
          <h3>Appearance</h3>
          <p className="settings-desc">Choose light or dark mode for the app.</p>
          <div className="theme-switch-row">
            <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
              <span>{theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</span>
            </button>
          </div>
        </div>

        <div className="settings-card">
          <h3>Account</h3>
          <p className="settings-desc">Your account details.</p>
          <div className="account-info">
            <p><strong>Name:</strong> {user.firstName || user.name || '—'} {user.lastName || ''}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
