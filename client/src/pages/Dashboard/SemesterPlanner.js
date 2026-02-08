import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen as BookIcon, Calendar as CalendarIcon } from 'lucide-react';
import api from '../../services/api';
import Calendar from '../../components/Calendar';
import './SemesterPlanner.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function SemesterPlanner({ user }) {
  const [semesters, setSemesters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    season: 'Fall'
  });
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [showTimetableForm, setShowTimetableForm] = useState(false);
  const [slotForm, setSlotForm] = useState({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '10:00',
    courseLabel: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!slotForm.courseLabel.trim() || !selectedSemesterId) return;
    try {
      await api.post('/api/timetable', {
        semesterId: selectedSemesterId,
        dayOfWeek: slotForm.dayOfWeek,
        startTime: slotForm.startTime,
        endTime: slotForm.endTime,
        courseLabel: slotForm.courseLabel.trim()
      });
      fetchTimetable();
      setSlotForm({ dayOfWeek: 1, startTime: '09:00', endTime: '10:00', courseLabel: '' });
      setShowTimetableForm(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Failed to add timetable slot:', error);
    }
  };

  const handleDateSelect = (date) => {
    // Calculate day of week (0 = Sunday, need to convert to 1 = Monday format)
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
    setSelectedDate(date);
    setSlotForm({ ...slotForm, dayOfWeek });
    setShowTimetableForm(true);
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm('Remove this time slot?')) return;
    try {
      await api.delete(`/api/timetable/${id}`);
      fetchTimetable();
    } catch (error) {
      console.error('Failed to delete slot:', error);
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

  const slotsByDay = DAYS.map((name, i) => ({
    dayOfWeek: i + 1,
    name,
    slots: timetable.filter(s => s.dayOfWeek === i + 1)
  }));

  const selectedSemester = semesters.find(s => s.id === selectedSemesterId);

  return (
    <div className="semester-planner">
      <div className="section-header">
        <h1><BookIcon size={32} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />Semester Planner</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Semester'}
        </button>
      </div>

      {showForm && (
        <form className="semester-form" onSubmit={handleSubmit}>
          <select 
            value={formData.season}
            onChange={(e) => setFormData({...formData, season: e.target.value})}
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
          />
          <button type="submit" className="btn btn-success">Create</button>
        </form>
      )}

      <div className="semesters-list">
        {semesters.length === 0 ? (
          <p className="empty-state">No semesters yet. Create one to get started!</p>
        ) : (
          semesters.map(semester => (
            <div key={semester.id} className="semester-item">
              <div className="semester-info">
                <h3>{semester.term} {semester.year}</h3>
                <p>{semester.startDate ? new Date(semester.startDate).toLocaleDateString() : ''} – {semester.endDate ? new Date(semester.endDate).toLocaleDateString() : ''}</p>
                <span className="course-count">Semester</span>
              </div>
              <div className="semester-item-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  onClick={() => setSelectedSemesterId(semester.id)}
                >
                  Timetable
                </button>
                <button 
                  className="btn btn-danger btn-small"
                  onClick={() => handleDelete(semester.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedSemester && (
        <div className="timetable-section">
          <h2><CalendarIcon size={32} style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />Weekly Timetable — {selectedSemester.term} {selectedSemester.year}</h2>
          
          {showTimetableForm && (
            <form className="timetable-form" onSubmit={handleAddSlot}>
              {selectedDate && (
                <div className="selected-date-display">
                  <p className="date-label">Adding class on:</p>
                  <p className="date-value">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                </div>
              )}
              <select
                value={slotForm.dayOfWeek}
                onChange={(e) => setSlotForm({ ...slotForm, dayOfWeek: parseInt(e.target.value, 10) })}
              >
                {DAYS.map((day, i) => (
                  <option key={day} value={i + 1}>{day}</option>
                ))}
              </select>
              <input
                type="time"
                value={slotForm.startTime}
                onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
              />
              <input
                type="time"
                value={slotForm.endTime}
                onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
              />
              <input
                type="text"
                placeholder="Course name (e.g. Physics, Computer Science)"
                value={slotForm.courseLabel}
                onChange={(e) => setSlotForm({ ...slotForm, courseLabel: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-success">Add slot</button>
              <button 
                type="button"
                onClick={() => {
                  setShowTimetableForm(false);
                  setSelectedDate(null);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </form>
          )}

          {!showTimetableForm && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowTimetableForm(true)}
            >
              + Add time slot
            </button>
          )}

          <div className="timetable-grid">
            {slotsByDay.map(({ name, slots }) => (
              <div key={name} className="timetable-day">
                <h4>{name}</h4>
                {slots.length === 0 ? (
                  <p className="no-slots">No classes</p>
                ) : (
                  <ul>
                    {slots.map(slot => (
                      <li key={slot.id} className="timetable-slot">
                        <span className="slot-time">{formatTime(slot.startTime)} – {formatTime(slot.endTime)}</span>
                        <span className="slot-course">{slot.courseLabel}</span>
                        <button
                          type="button"
                          className="btn btn-danger btn-tiny"
                          onClick={() => handleDeleteSlot(slot.id)}
                          aria-label="Remove slot"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="calendar-section">
            <h3>Click a date to add a class</h3>
            <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          </div>
        </div>
      )}
    </div>
  );
}

export default SemesterPlanner;
