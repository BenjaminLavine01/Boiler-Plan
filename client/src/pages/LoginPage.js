import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/auth/login', loginData);
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/auth/register', {
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.name.split(' ')[0] || registerData.name,
        lastName: registerData.name.split(' ').slice(1).join(' ') || ''
      });
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`login-page login-page-${theme}`}>
      <div className="login-background" />
      <div className="login-container">
        <div className="login-header">
          <h1><BookOpen size={32} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} /> BoilerPlan</h1>
          <p>Master Your Academic Journey</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => { setActiveTab('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            className={`tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => { setActiveTab('register'); setError(''); }}
          >
            Create Account
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="secure-notice">
              <p><CheckCircle2 size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />Secure Access</p>
              <small>By signing in, you agree to our Terms of Service and Privacy Policy</small>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@purdue.edu"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="secure-notice">
              <p><CheckCircle2 size={16} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />Secure Access</p>
              <small>By creating an account, you agree to our Terms of Service and Privacy Policy</small>
            </div>
          </form>
        )}

        <div className="login-footer">
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
