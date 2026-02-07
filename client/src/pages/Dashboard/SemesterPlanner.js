import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import Calendar from '../../components/Calendar';
import './SemesterPlanner.css';

function SemesterPlanner({ user }) {
  const [semesters, setSemesters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    season: 'Fall'
  });

  const fetchSemesters = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/api/semesters?userId=${user.id}`);
      setSemesters(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch semesters:', error);
      setSemesters([]);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/semesters', {
        userId: user.id,
        term: formData.season,
        year: formData.year
      });
      fetchSemesters();
      setFormData({ year: new Date().getFullYear(), season: 'Fall' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create semester:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this semester?')) {
      try {
        await api.delete(`/api/semesters/${id}`);
        fetchSemesters();
      } catch (error) {
        console.error('Failed to delete semester:', error);
      }
    }
  };

  return (
    <div className="semester-planner">
      <div className="section-header">
        <h1>📚 Semester Planner</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Semester'}
        </button>
      </div>

      {showForm && (
        <form className="semester-form" onSubmit={handleSubmit}>
          <select 
            value={formData.season}
            onChange={(e) => setFormData({...formData, season: e.target.value})}
          >
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
            min="2020"
            max="2030"
          />
          <button type="submit" className="btn btn-success">Create</button>
        </form>
      )}

      <div className="semesters-list">
        {semesters.length === 0 ? (
          <p className="empty-state">No semesters yet. Create one to get started!</p>
        ) : (
          semesters.map(semester => (
            <div key={semester.id} className="semester-item">
              <div className="semester-info">
                <h3>{semester.term} {semester.year}</h3>
                <p>{semester.startDate ? new Date(semester.startDate).toLocaleDateString() : ''} – {semester.endDate ? new Date(semester.endDate).toLocaleDateString() : ''}</p>
                <span className="course-count">Semester</span>
              </div>
              <button 
                className="btn btn-danger btn-small"
                onClick={() => handleDelete(semester.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <Calendar />
    </div>
  );
}

export default SemesterPlanner;
