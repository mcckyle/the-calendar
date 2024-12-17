// DaysOfWeek.jsx
import React from 'react';
import './DaysOfWeek.css';

const DaysOfWeek = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="calendar-days-of-week">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="calendar-day-of-week">
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
