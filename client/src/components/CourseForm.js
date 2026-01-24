import React, { useState } from 'react';
import './CourseForm.css';

function CourseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    courseCode: '',
    credits: 3,
    grade: 'Not Graded',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'credits' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.courseCode.trim()) {
      onSubmit(formData);
      setFormData({
        name: '',
        courseCode: '',
        credits: 3,
        grade: 'Not Graded',
        description: ''
      });
    }
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="courseCode"
        placeholder="Course Code (e.g., CS101)"
        value={formData.courseCode}
        onChange={handleChange}
        required
      />
      <select name="credits" value={formData.credits} onChange={handleChange}>
        <option value={1}>1 Credit</option>
        <option value={2}>2 Credits</option>
        <option value={3}>3 Credits</option>
        <option value={4}>4 Credits</option>
      </select>
      <select name="grade" value={formData.grade} onChange={handleChange}>
        <option value="Not Graded">Not Graded</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option>
      </select>
      <input
        type="text"
        name="description"
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-success">Add Course</button>
    </form>
  );
}

export default CourseForm;
