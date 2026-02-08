import React, { useState, useEffect } from 'react';
import { BookMarked, BookOpen as BookIcon } from 'lucide-react';
import api from '../../services/api';
import './CourseCatalog.css';

function CourseCatalog() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/purdue-courses');
      const data = Array.isArray(response.data) ? response.data : [];
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-catalog">
      <div className="section-header">
        <h1><BookIcon size={32} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />Course Catalog</h1>
        <p>Browse Purdue courses with details on prerequisites and difficulty</p>
      </div>

      {loading ? (
        <p className="loading">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="empty-state">No courses in catalog yet.</p>
      ) : (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course.id || course.code} className="course-card">
              <div className="course-header">
                <h3>{course.code}</h3>
                <span className="credits">{course.credits ?? '—'} CR</span>
              </div>
              <h4>{course.title}</h4>
              
              {course.description && (
                <p className="description">{course.description}</p>
              )}

              <div className="course-meta">
                {course.prerequisites && (
                  <div className="meta-item">
                    <strong>Prerequisites:</strong>
                    <p>{typeof course.prerequisites === 'string' ? course.prerequisites : (course.prerequisites.join?.(', ') ?? '—')}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseCatalog;
