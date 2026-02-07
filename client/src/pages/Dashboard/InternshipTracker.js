import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './InternshipTracker.css';

function InternshipTracker({ user }) {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    if (user?.id) fetchInternships();
  }, [user?.id]);

  const fetchInternships = async () => {
    try {
      const response = await api.get(`/api/internships/user/${user.id}`);
      setInternships(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch internships:', error);
      setInternships([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/internships', {
        userId: user.id,
        company: formData.company,
        role: formData.role,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        description: formData.description || null
      });
      fetchInternships();
      setFormData({ company: '', role: '', startDate: '', endDate: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create internship:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this internship?')) {
      try {
        await api.delete(`/api/internships/${id}`);
        fetchInternships();
      } catch (error) {
        console.error('Failed to delete internship:', error);
      }
    }
  };

  return (
    <div className="internship-tracker">
      <div className="section-header">
        <h1>🏢 Internship Tracker</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Internship'}
        </button>
      </div>

      {showForm && (
        <form className="internship-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Role / Position"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            required
          />
          <input
            type="date"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
          <input
            type="date"
            placeholder="End Date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={2}
          />
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      )}

      <div className="internships-list">
        {internships.length === 0 ? (
          <p className="empty-state">No internships logged yet. Start tracking your applications!</p>
        ) : (
          internships.map(internship => (
            <div key={internship.id} className="internship-item">
              <div className="internship-info">
                <h3>{internship.company}</h3>
                <p className="position">{internship.role}</p>
                <div className="internship-details">
                  {internship.startDate && <span>From {new Date(internship.startDate).toLocaleDateString()}</span>}
                  {internship.endDate && <span>To {new Date(internship.endDate).toLocaleDateString()}</span>}
                  {internship.description && <span>{internship.description}</span>}
                </div>
              </div>
              <button 
                className="btn btn-danger btn-small"
                onClick={() => handleDelete(internship.id)}
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

export default InternshipTracker;
