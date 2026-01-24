import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardNav.css';

function DashboardNav({ activeSection, onSectionChange, user, onLogout }) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: '📊 Dashboard', icon: '📊' },
    { id: 'semester-planner', label: '📚 Semester Planner', icon: '📚' },
    { id: 'courses', label: '📖 Course Catalog', icon: '📖' },
    { id: 'internships', label: '🏢 Internships', icon: '🏢' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' }
  ];

  return (
    <nav className="dashboard-nav">
      <div className="nav-header">
        <h2>🎓 BoilerPlan</h2>
      </div>

      <div className="user-info">
        <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
        <div className="user-details">
          <p className="user-name">{user.name}</p>
          <p className="user-major">{user.major}</p>
        </div>
      </div>

      <div className="nav-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="nav-footer">
        <button className="nav-item profile-btn" onClick={() => navigate('/profile')}>
          <span className="icon">⚙️</span>
          <span className="label">Settings</span>
        </button>
        <button className="nav-item logout-btn" onClick={onLogout}>
          <span className="icon">🚪</span>
          <span className="label">Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

export default DashboardNav;
