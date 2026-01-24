import React from 'react';
import './SemesterList.css';

function SemesterList({ semesters, selectedSemester, onSelect, onDelete }) {
  return (
    <div className="semester-list">
      {semesters.length === 0 ? (
        <p className="empty-state">No semesters yet. Create one to get started!</p>
      ) : (
        semesters.map(semester => (
          <div
            key={semester._id}
            className={`semester-card ${selectedSemester?._id === semester._id ? 'active' : ''}`}
            onClick={() => onSelect(semester)}
          >
            <div className="semester-info">
              <h3>{semester.name}</h3>
              <p>{semester.season} {semester.year}</p>
              <span className="course-count">{semester.courses?.length || 0} courses</span>
            </div>
            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Are you sure you want to delete this semester?')) {
                  onDelete(semester._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SemesterList;
