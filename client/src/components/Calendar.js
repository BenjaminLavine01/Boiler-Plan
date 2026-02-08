import React, { useState } from 'react';
import './Calendar.css';

function Calendar({ selectedDate, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    if (day && onDateSelect) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      onDateSelect(date);
    }
  };

  const today = new Date();
  const isCurrentMonth = 
    today.getFullYear() === currentDate.getFullYear() && 
    today.getMonth() === currentDate.getMonth();

  const isDateSelected = (day) => {
    if (!selectedDate || !day) return false;
    return (
      selectedDate.getFullYear() === currentDate.getFullYear() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getDate() === day
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={handlePrevMonth}>←</button>
        <h3 className="calendar-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button className="calendar-nav-btn" onClick={handleNextMonth}>→</button>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? 'active' : 'empty'} ${
              isCurrentMonth && day === today.getDate() ? 'today' : ''
            } ${isDateSelected(day) ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
            role="button"
            tabIndex={day ? 0 : -1}
            onKeyDown={(e) => {
              if (day && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleDateClick(day);
              }
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
