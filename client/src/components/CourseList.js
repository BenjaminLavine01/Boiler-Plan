import React, { useState } from 'react';
import './CourseList.css';

const gradeGPA = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
  'Not Graded': 0.0
};

function CourseList({ courses, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (courseId) => {
    const gpaValue = gradeGPA[editData.grade] || 0;
    onUpdate(courseId, {
      ...editData,
      gpa: gpaValue
    });
    setEditingId(null);
  };

  const handleStartEdit = (course) => {
    setEditingId(course._id);
    setEditData({
      name: course.name,
      courseCode: course.courseCode,
      credits: course.credits,
      grade: course.grade,
      description: course.description
    });
  };

  const calculateSemesterGPA = () => {
    if (courses.length === 0) return 0;
    let totalGPA = 0;
    let totalCredits = 0;
    courses.forEach(course => {
      totalGPA += gradeGPA[course.grade] * course.credits;
      totalCredits += course.credits;
    });
    return totalCredits > 0 ? (totalGPA / totalCredits).toFixed(2) : 0;
  };

  const getTotalCredits = () => {
    return courses.reduce((sum, course) => sum + course.credits, 0);
  };

  return (
    <div className="course-list">
      {courses.length === 0 ? (
        <p className="empty-state">No courses yet. Add one to get started!</p>
      ) : (
        <>
          <div className="course-stats">
            <div className="stat">
              <span className="stat-label">Total Credits:</span>
              <span className="stat-value">{getTotalCredits()}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Semester GPA:</span>
              <span className="stat-value">{calculateSemesterGPA()}</span>
            </div>
          </div>

          <div className="courses-table">
            {courses.map(course => (
              <div key={course._id} className="course-row">
                {editingId === course._id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="course-edit-input"
                    />
                    <input
                      type="text"
                      name="courseCode"
                      value={editData.courseCode}
                      onChange={handleEditChange}
                      className="course-edit-input"
                    />
                    <select
                      name="credits"
                      value={editData.credits}
                      onChange={handleEditChange}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                    <select
                      name="grade"
                      value={editData.grade}
                      onChange={handleEditChange}
                    >
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
                    <div className="course-actions">
                      <button
                        className="btn btn-success"
                        onClick={() => handleSaveEdit(course._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="course-info">
                      <h4>{course.name}</h4>
                      <p className="course-code">{course.courseCode}</p>
                      {course.description && (
                        <p className="course-description">{course.description}</p>
                      )}
                    </div>
                    <div className="course-meta">
                      <span className="badge credits">
                        {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
                      </span>
                      <span className={`badge grade grade-${course.grade.replace(/[^a-z]/gi, '')}`}>
                        {course.grade}
                      </span>
                      <span className="gpa">
                        GPA: {gradeGPA[course.grade].toFixed(1)}
                      </span>
                    </div>
                    <div className="course-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleStartEdit(course)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this course?')) {
                            onDelete(course._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CourseList;
