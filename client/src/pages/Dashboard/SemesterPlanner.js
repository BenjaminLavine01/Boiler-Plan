import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SemesterPlanner.css';

function SemesterPlanner({ user }) {
  const [semesters, setSemesters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    season: 'Fall'
  });

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      const response = await axios.get('/api/semesters');
      setSemesters(response.data);
    } catch (error) {
      console.error('Failed to fetch semesters:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/semesters', formData);
      fetchSemesters();
      setFormData({ name: '', year: new Date().getFullYear(), season: 'Fall' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create semester:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this semester?')) {
      try {
        await axios.delete(`/api/semesters/${id}`);
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
          <input
            type="text"
            placeholder="Semester Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
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
            <div key={semester._id} className="semester-item">
              <div className="semester-info">
                <h3>{semester.name}</h3>
                <p>{semester.season} {semester.year}</p>
                <span className="course-count">{semester.courses?.length || 0} courses</span>
              </div>
              <button 
                className="btn btn-danger btn-small"
                onClick={() => handleDelete(semester._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SemesterPlanner;
