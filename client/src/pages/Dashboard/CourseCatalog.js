import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseCatalog.css';

function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDept]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const url = selectedDept 
        ? `/api/purdue-courses/department/${selectedDept}`
        : `/api/purdue-courses`;
      
      const response = await axios.get(url);
      setCourses(response.data);

      // Extract unique departments
      const depts = [...new Set(response.data.map(c => c.department))];
      setDepartments(depts.sort());
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-catalog">
      <div className="section-header">
        <h1>📖 Course Catalog</h1>
        <p>Browse Purdue courses with details on prerequisites and difficulty</p>
      </div>

      <div className="catalog-filters">
        <select 
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="filter-select"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="empty-state">No courses found. Try a different department.</p>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <div className="course-header">
                <h3>{course.courseCode}</h3>
                <span className="credits">{course.credits} CR</span>
              </div>
              <h4>{course.name}</h4>
              <p className="department">{course.department}</p>
              
              {course.description && (
                <p className="description">{course.description}</p>
              )}

              <div className="course-meta">
                {course.prerequisites && course.prerequisites.length > 0 && (
                  <div className="meta-item">
                    <strong>Prerequisites:</strong>
                    <p>{course.prerequisites.join(', ')}</p>
                  </div>
                )}
                
                <div className="meta-item">
                  <strong>Difficulty:</strong>
                  <div className="difficulty-rating">
                    {'⭐'.repeat(course.difficulty)}
                  </div>
                </div>

                <div className="meta-item">
                  <strong>Workload:</strong>
                  <span className={`workload ${course.workload.toLowerCase()}`}>
                    {course.workload}
                  </span>
                </div>
              </div>

              {course.isCoreClass && (
                <div className="core-badge">📚 Core Class</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseCatalog;
