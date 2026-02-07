import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, BookOpen, Briefcase, BarChart3, Settings, LogOut, TrendingUp } from 'lucide-react';
import './DashboardNav.css';

function DashboardNav({ activeSection, onSectionChange, user, onLogout }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'semester-planner', label: 'Semester Planner', icon: Calendar },
    { id: 'courses', label: 'Course Catalog', icon: BookOpen },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <nav className="dashboard-nav">
      <div className="nav-header">
        <h2>🎓 BoilerPlan</h2>
      </div>

      <div className="user-info">
        <div className="user-avatar">{(user.firstName || user.name || 'U').charAt(0).toUpperCase()}</div>
        <div className="user-details">
          <p className="user-name">{user.firstName || user.name || 'User'}</p>
          <p className="user-major">{user.major || user.email}</p>
        </div>
      </div>

      <div className="nav-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="icon"><item.icon size={20} strokeWidth={1.5} /></span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="nav-features">
        <p className="nav-features-title">Key Features</p>
        <div className="features-mini-grid">
          <div className="feature-mini">
            <div className="feature-mini-icon"><Calendar size={32} color="white" strokeWidth={1.5} /></div>
            <span className="feature-mini-label">Smart Scheduling</span>
          </div>
          <div className="feature-mini">
            <div className="feature-mini-icon"><TrendingUp size={32} color="white" strokeWidth={1.5} /></div>
            <span className="feature-mini-label">Track Progress</span>
          </div>
          <div className="feature-mini">
            <div className="feature-mini-icon"><BookOpen size={32} color="white" strokeWidth={1.5} /></div>
            <span className="feature-mini-label">Course Catalog</span>
          </div>
        </div>
      </div>

      <div className="nav-footer">
        <button
          className={`nav-item profile-btn ${activeSection === 'settings' ? 'active' : ''}`}
          onClick={() => onSectionChange('settings')}
        >
          <span className="icon"><Settings size={20} strokeWidth={1.5} /></span>
          <span className="label">Settings</span>
        </button>
        <button className="nav-item logout-btn" onClick={onLogout}>
          <span className="icon"><LogOut size={20} strokeWidth={1.5} /></span>
          <span className="label">Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

export default DashboardNav;
