import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, BookOpen } from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      {/* Left Section - Dark with Features */}
      <section className="landing-left">
        <div className="left-content">
          {/* Logo */}
          <div className="logo-section">
            <span className="logo">B</span>
            <span className="logo-text">BoilerPlan</span>
          </div>

          {/* Hero */}
          <div className="hero-section">
            <h1 className="hero-title">
              Master your
              <span className="gradient-text"> academic journey</span>
            </h1>
            <p className="hero-desc">
              The ultimate semester optimizer designed for Purdue students. Plan your courses, manage internships, and graduate on time with confidence.
            </p>
          </div>

          {/* Features */}
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon"><Calendar size={32} color="white" strokeWidth={1.5} /></div>
              <div className="feature-content">
                <h3>Smart Scheduling</h3>
                <p>Optimize your semesters based on prerequisites and workload.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><TrendingUp size={32} color="white" strokeWidth={1.5} /></div>
              <div className="feature-content">
                <h3>Track Progress</h3>
                <p>Visualize your path to graduation with real-time analytics.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><BookOpen size={32} color="white" strokeWidth={1.5} /></div>
              <div className="feature-content">
                <h3>Course Catalog</h3>
                <p>Browse and plan courses with Purdue-specific data.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="left-footer">
            <p>© 2026 BoilerPlan. Not officially affiliated with Purdue University.</p>
          </div>
        </div>
      </section>

      {/* Right Section - Light with Login */}
      <section className="landing-right">
        <div className="right-content">
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome Back</h2>
            <p className="welcome-subtitle">Sign in to your BoilerPlan account</p>
          </div>

          <div className="login-form">
            <button 
              className="login-button"
              onClick={() => navigate('/login')}
            >
              Continue to Login
            </button>
          </div>

          <div className="secure-access">
            <p className="terms-text">By logging in, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
