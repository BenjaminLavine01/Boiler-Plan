import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen as BookIcon, Calendar as CalendarIcon, Plus, X } from 'lucide-react';
import api from '../../services/api';
import Calendar from '../../components/Calendar';
import './SemesterPlanner.css';

function SemesterPlanner({ user }) {
  const [semesters, setSemesters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    season: 'Fall'
  });
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [showClassForm, setShowClassForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [classForm, setClassForm] = useState({
    courseName: '',
    startTime: '09:00',
    endTime: '10:00'
  });

  const fetchSemesters = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await api.get(`/api/semesters?userId=${user.id}`);
      setSemesters(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch semesters:', error);
      setSemesters([]);
    }
  }, [user?.id]);

  useEffect(() => {
    if (semesters.length > 0 && !selectedSemesterId) {
      setSelectedSemesterId(semesters[0].id);
    }
  }, [semesters, selectedSemesterId]);

  const fetchTimetable = useCallback(async () => {
    if (!selectedSemesterId) {
      setTimetable([]);
      return;
    }
    try {
      const response = await api.get(`/api/timetable?semesterId=${selectedSemesterId}`);
      setTimetable(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch timetable:', error);
      setTimetable([]);
    }
  }, [selectedSemesterId]);

  useEffect(() => {
    fetchSemesters();
  }, [fetchSemesters]);

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/semesters', {
        userId: user.id,
        term: formData.season,
        year: formData.year
      });
      fetchSemesters();
      setFormData({ year: new Date().getFullYear(), season: 'Fall' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create semester:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this semester?')) {
      try {
        await api.delete(`/api/semesters/${id}`);
        fetchSemesters();
        if (selectedSemesterId === id) setSelectedSemesterId(null);
      } catch (error) {
        console.error('Failed to delete semester:', error);
      }
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!classForm.courseName.trim() || !selectedDate || !selectedSemesterId) return;
    
    const dayOfWeek = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay();
    
    try {
      await api.post('/api/timetable', {
        semesterId: selectedSemesterId,
        dayOfWeek: dayOfWeek,
        startTime: classForm.startTime,
        endTime: classForm.endTime,
        courseLabel: classForm.courseName.trim()
      });
      fetchTimetable();
      setClassForm({ courseName: '', startTime: '09:00', endTime: '10:00' });
      setShowClassForm(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Failed to add class:', error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowClassForm(true);
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm('Remove this class?')) return;
    try {
      await api.delete(`/api/timetable/${id}`);
      fetchTimetable();
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  const formatTime = (t) => {
    if (!t) return '—';
    if (t.includes(':')) {
      const [h, m] = t.split(':').map(Number);
      if (h === 0) return `12:${String(m).padStart(2, '0')} am`;
      if (h < 12) return `${h}:${String(m).padStart(2, '0')} am`;
      if (h === 12) return `12:${String(m).padStart(2, '0')} pm`;
      return `${h - 12}:${String(m).padStart(2, '0')} pm`;
    }
    return t;
  };

  const getClassesForDate = (date) => {
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
    return timetable.filter(slot => slot.dayOfWeek === dayOfWeek);
  };

  const selectedSemester = semesters.find(s => s.id === selectedSemesterId);

  return (
    <div className="semester-planner-calendly">
      {/* Sidebar */}
      <aside className="sp-sidebar">
        <div className="sp-header">
          <h1><BookIcon size={24} />Schedule</h1>
        </div>

        {/* Add Semester */}
        {!showForm ? (
          <button className="sp-add-semester-btn" onClick={() => setShowForm(true)}>
            <Plus size={20} /> New Semester
          </button>
        ) : (
          <form className="sp-semester-form" onSubmit={handleSubmit}>
            <select 
              value={formData.season}
              onChange={(e) => setFormData({...formData, season: e.target.value})}
              required
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
              required
            />
            <div className="sp-form-actions">
              <button type="submit" className="sp-btn-success">Create</button>
              <button type="button" className="sp-btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        {/* Semesters List */}
        <div className="sp-semesters">
          {semesters.length === 0 ? (
            <p className="sp-empty">No semesters</p>
          ) : (
            semesters.map(semester => (
              <div 
                key={semester.id} 
                className={`sp-semester-item ${selectedSemesterId === semester.id ? 'active' : ''}`}
                onClick={() => setSelectedSemesterId(semester.id)}
              >
                <div className="sp-sem-info">
                  <h4>{semester.term} {semester.year}</h4>
                  <p>{new Date(semester.startDate).toLocaleDateString() || 'TBD'}</p>
                </div>
                <button
                  className="sp-delete-semester"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(semester.id);
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Calendar View */}
      <main className="sp-main">
        {selectedSemester ? (
          <>
            <div className="sp-calendar-header">
              <h2>{selectedSemester.term} {selectedSemester.year}</h2>
              <button 
                className="sp-add-class-btn"
                onClick={() => {
                  setSelectedDate(null);
                  setClassForm({ courseName: '', startTime: '09:00', endTime: '10:00' });
                  setShowClassForm(true);
                }}
              >
                <Plus size={20} /> Add Class
              </button>
            </div>

            {showClassForm && (
              <div className="sp-class-form-overlay" onClick={() => setShowClassForm(false)}>
                <div className="sp-class-form" onClick={(e) => e.stopPropagation()}>
                  <div className="sp-form-header">
                    <h3>Add Class</h3>
                    <button className="sp-close-btn" onClick={() => setShowClassForm(false)}>
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleAddClass}>
                    <div className="sp-form-group">
                      <label>Course Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Physics 101"
                        value={classForm.courseName}
                        onChange={(e) => setClassForm({ ...classForm, courseName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="sp-form-group">
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={classForm.startTime}
                        onChange={(e) => setClassForm({ ...classForm, startTime: e.target.value })}
                      />
                    </div>
                    <div className="sp-form-group">
                      <label>End Time</label>
                      <input
                        type="time"
                        value={classForm.endTime}
                        onChange={(e) => setClassForm({ ...classForm, endTime: e.target.value })}
                      />
                    </div>
                    {selectedDate && (
                      <div className="sp-selected-date">
                        <p>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                      </div>
                    )}
                    <button type="submit" className="sp-btn-success">Add Class</button>
                  </form>
                </div>
              </div>
            )}

            <div className="sp-calendar-container">
              <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
            </div>

            {selectedDate && (
              <div className="sp-day-details">
                <h3>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                <div className="sp-classes-list">
                  {getClassesForDate(selectedDate).length === 0 ? (
                    <p className="sp-no-classes">No classes scheduled</p>
                  ) : (
                    getClassesForDate(selectedDate).map(slot => (
                      <div key={slot.id} className="sp-class-item">
                        <div className="sp-class-details">
                          <h4>{slot.courseLabel}</h4>
                          <p>{formatTime(slot.startTime)} – {formatTime(slot.endTime)}</p>
                        </div>
                        <button
                          className="sp-delete-class"
                          onClick={() => handleDeleteSlot(slot.id)}
                          title="Delete class"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="sp-empty-state">
            <CalendarIcon size={48} />
            <h3>No semester selected</h3>
            <p>Create a semester to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default SemesterPlanner;
