// Days.jsx
import React from 'react';
import './Days.css';

const Days = ({ currentDate, selectedDate, onDayClick, events }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  return (
    <div className="days-grid">
      {/* Render empty days before the start of the month */}
      {emptyDays.map((_, index) => (
        <div key={`empty-${index}`} className="calendar-day empty"></div>
      ))}
      {/* Render actual days */}
      {daysArray.map((day) => (
        <div
          key={day}
          className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''}`}
          onClick={() => onDayClick(day)}
        >
          {day}
          {/* Optionally, add event markers */}
          {events[day] && <div className="event-marker">Event</div>}
        </div>
      ))}
    </div>
  );
};

export default Days;
