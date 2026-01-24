import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">🎓 BoilerPlan</div>
          <button 
            className="nav-btn"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Academic Journey</h1>
          <p className="hero-subtitle">The ultimate semester optimizer designed for Purdue students</p>
          <p className="hero-description">
            Plan your courses, manage internships, and graduate on time with confidence.
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">📚</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Scheduling</h3>
            <p>Optimize your semesters based on prerequisites and workload. Find the perfect balance.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Visualize your path to graduation with real-time analytics and GPA tracking.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Internship Management</h3>
            <p>Track internship applications, offers, and connect them to your academic timeline.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Course Catalog</h3>
            <p>Browse and plan courses with Purdue-specific data, prerequisites, and difficulty ratings.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Prerequisite Tracking</h3>
            <p>Never miss a prerequisite. Know exactly which courses you need before registration.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Graduation Planning</h3>
            <p>Plan your entire degree path with confidence. Know your requirements at a glance.</p>
          </div>
        </div>
      </section>

      {/* Why Choose BoilerPlan */}
      <section className="why-us">
        <h2>Why Choose BoilerPlan?</h2>
        <div className="why-content">
          <div className="why-item">
            <h3>✓ Purdue-Specific</h3>
            <p>Built by Purdue students, for Purdue students. We understand your challenges.</p>
          </div>
          <div className="why-item">
            <h3>✓ Smart Recommendations</h3>
            <p>Get personalized course recommendations based on your major and graduation goals.</p>
          </div>
          <div className="why-item">
            <h3>✓ GPA Optimization</h3>
            <p>Balance your course load to maximize GPA while meeting degree requirements.</p>
          </div>
          <div className="why-item">
            <h3>✓ Career Integration</h3>
            <p>Plan internships alongside your academic schedule for maximum impact.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Plan Your Future?</h2>
        <p>Join thousands of Purdue students who are taking control of their academic journey.</p>
        <button 
          className="cta-button-large"
          onClick={() => navigate('/login')}
        >
          Sign In Now
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>&copy; 2026 BoilerPlan. Not officially affiliated with Purdue University.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
