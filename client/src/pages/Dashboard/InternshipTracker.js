import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InternshipTracker.css';

function InternshipTracker({ user }) {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    semester: 'Summer',
    year: new Date().getFullYear(),
    status: 'Applied',
    location: '',
    stipend: 0
  });

  useEffect(() => {
    fetchInternships();
  }, [user]);

  const fetchInternships = async () => {
    try {
      const response = await axios.get(`/api/internships/user/${user._id}`);
      setInternships(response.data);
    } catch (error) {
      console.error('Failed to fetch internships:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/internships', {
        ...formData,
        userId: user._id
      });
      fetchInternships();
      setFormData({
        company: '',
        position: '',
        semester: 'Summer',
        year: new Date().getFullYear(),
        status: 'Applied',
        location: '',
        stipend: 0
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create internship:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this internship?')) {
      try {
        await axios.delete(`/api/internships/${id}`);
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
            placeholder="Position"
            value={formData.position}
            onChange={(e) => setFormData({...formData, position: e.target.value})}
            required
          />
          <select 
            value={formData.semester}
            onChange={(e) => setFormData({...formData, semester: e.target.value})}
          >
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
            <option value="Winter">Winter</option>
          </select>
          <input
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
          />
          <select 
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Applied">Applied</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <input
            type="number"
            placeholder="Stipend ($)"
            value={formData.stipend}
            onChange={(e) => setFormData({...formData, stipend: parseInt(e.target.value)})}
          />
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      )}

      <div className="internships-list">
        {internships.length === 0 ? (
          <p className="empty-state">No internships logged yet. Start tracking your applications!</p>
        ) : (
          internships.map(internship => (
            <div key={internship._id} className="internship-item">
              <div className="internship-info">
                <h3>{internship.company}</h3>
                <p className="position">{internship.position}</p>
                <div className="internship-details">
                  <span>{internship.semester} {internship.year}</span>
                  <span className={`status ${internship.status.toLowerCase()}`}>
                    {internship.status}
                  </span>
                  {internship.location && <span>📍 {internship.location}</span>}
                  {internship.stipend > 0 && <span>💰 ${internship.stipend}</span>}
                </div>
              </div>
              <button 
                className="btn btn-danger btn-small"
                onClick={() => handleDelete(internship._id)}
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
