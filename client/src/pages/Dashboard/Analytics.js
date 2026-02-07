import React from 'react';
import './Analytics.css';

function Analytics({ user }) {
  return (
    <div className="analytics">
      <div className="section-header">
        <h1>📈 Analytics & Progress</h1>
        <p>Track your academic progress toward graduation</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Years Until Graduation</h3>
          <p className="stat">{Math.max(0, (user.graduationYear || new Date().getFullYear() + 4) - new Date().getFullYear())}</p>
          <p className="detail">{user.graduationYear || new Date().getFullYear() + 4}</p>
        </div>

        <div className="analytics-card">
          <h3>Current GPA</h3>
          <p className="stat">3.85</p>
          <p className="detail">Based on completed courses</p>
        </div>

        <div className="analytics-card">
          <h3>Credits Completed</h3>
          <p className="stat">45</p>
          <p className="detail">Out of typically 120 required</p>
        </div>

        <div className="analytics-card">
          <h3>Progress to Graduation</h3>
          <div className="progress-bar">
            <div className="progress" style={{width: '37.5%'}}></div>
          </div>
          <p className="detail">37.5% Complete</p>
        </div>
      </div>

      <div className="analytics-section">
        <h2>Coming Soon</h2>
        <p>Detailed analytics features including:</p>
        <ul>
          <li>✓ GPA tracking and calculations</li>
          <li>✓ Degree requirement progress</li>
          <li>✓ Course load analysis</li>
          <li>✓ Graduation timeline projection</li>
          <li>✓ Grade distribution charts</li>
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
