import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SemesterList from './components/SemesterList';
import SemesterForm from './components/SemesterForm';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';

function App() {
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [showSemesterForm, setShowSemesterForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch semesters on component mount
  useEffect(() => {
    fetchSemesters();
  }, []);

  // Fetch courses when semester changes
  useEffect(() => {
    if (selectedSemester) {
      fetchCourses(selectedSemester._id);
    } else {
      setCourses([]);
    }
  }, [selectedSemester]);

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/semesters');
      setSemesters(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch semesters: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async (semesterId) => {
    try {
      const response = await axios.get(`/api/courses/semester/${semesterId}`);
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setCourses([]);
    }
  };

  const handleAddSemester = async (semesterData) => {
    try {
      await axios.post('/api/semesters', semesterData);
      await fetchSemesters();
      setShowSemesterForm(false);
    } catch (err) {
      setError('Failed to add semester: ' + err.message);
      console.error(err);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      const courseWithSemester = {
        ...courseData,
        semester: selectedSemester._id
      };
      await axios.post('/api/courses', courseWithSemester);
      await fetchCourses(selectedSemester._id);
      setShowCourseForm(false);
    } catch (err) {
      setError('Failed to add course: ' + err.message);
      console.error(err);
    }
  };

  const handleDeleteSemester = async (semesterId) => {
    try {
      await axios.delete(`/api/semesters/${semesterId}`);
      await fetchSemesters();
      if (selectedSemester?._id === semesterId) {
        setSelectedSemester(null);
      }
    } catch (err) {
      setError('Failed to delete semester: ' + err.message);
      console.error(err);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      if (selectedSemester) {
        await fetchCourses(selectedSemester._id);
      }
    } catch (err) {
      setError('Failed to delete course: ' + err.message);
      console.error(err);
    }
  };

  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      await axios.put(`/api/courses/${courseId}`, courseData);
      if (selectedSemester) {
        await fetchCourses(selectedSemester._id);
      }
    } catch (err) {
      setError('Failed to update course: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📚 Semester Planner</h1>
        <p>Plan and track your academic progress</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="container">
        <div className="semesters-section">
          <div className="section-header">
            <h2>Semesters</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowSemesterForm(!showSemesterForm)}
            >
              {showSemesterForm ? 'Cancel' : '+ Add Semester'}
            </button>
          </div>

          {showSemesterForm && (
            <SemesterForm onSubmit={handleAddSemester} />
          )}

          {loading ? (
            <p>Loading semesters...</p>
          ) : (
            <SemesterList 
              semesters={semesters}
              selectedSemester={selectedSemester}
              onSelect={setSelectedSemester}
              onDelete={handleDeleteSemester}
            />
          )}
        </div>

        {selectedSemester && (
          <div className="courses-section">
            <div className="section-header">
              <h2>Courses - {selectedSemester.season} {selectedSemester.year}</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowCourseForm(!showCourseForm)}
              >
                {showCourseForm ? 'Cancel' : '+ Add Course'}
              </button>
            </div>

            {showCourseForm && (
              <CourseForm onSubmit={handleAddCourse} />
            )}

            <CourseList 
              courses={courses}
              onDelete={handleDeleteCourse}
              onUpdate={handleUpdateCourse}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
