import React, { useState } from 'react';
import './SemesterForm.css';

function SemesterForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    season: 'Fall'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({
        name: '',
        year: new Date().getFullYear(),
        season: 'Fall'
      });
    }
  };

  return (
    <form className="semester-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Semester Name (e.g., Spring 2024)"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <select name="season" value={formData.season} onChange={handleChange}>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
        <option value="Fall">Fall</option>
        <option value="Winter">Winter</option>
      </select>
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        min="2020"
        max="2030"
      />
      <button type="submit" className="btn btn-success">Add Semester</button>
    </form>
  );
}

export default SemesterForm;
