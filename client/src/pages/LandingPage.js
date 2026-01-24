import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-inner">
          <div className="logo-container">
            <span className="logo">B</span>
            <span>BoilerPlan</span>
          </div>
          <button 
            className="nav-signin"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-h1">
              Master your
              <span className="gradient-text"> academic journey</span>
            </h1>
            <p className="hero-desc">
              The ultimate semester optimizer designed for Purdue students. Plan your courses, manage internships, and graduate on time with confidence.
            </p>
            <div className="hero-cta">
              <button 
                className="btn-primary"
                onClick={() => navigate('/login')}
              >
                Get Started
              </button>
              <button 
                className="btn-secondary"
                onClick={() => navigate('/login')}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-box">📚</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-inner">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎯</span>
              <h3>Smart Scheduling</h3>
              <p>Optimize your semesters based on prerequisites and workload.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>Track Progress</h3>
              <p>Visualize your path to graduation with real-time analytics.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📚</span>
              <h3>Course Catalog</h3>
              <p>Browse and plan courses with Purdue-specific data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 BoilerPlan. Not officially affiliated with Purdue University.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
