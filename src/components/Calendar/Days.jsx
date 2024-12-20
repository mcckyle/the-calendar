import React from 'react';
import './Days.css';
import Day from './Day'; // Import the Day component to render individual days

const Days = ({ currentDate, selectedDate, onDayClick, events }) => {
  // Calculate the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Find out the first day of the month (for empty cells before the first day)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Create empty cells for the days before the 1st of the month
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`empty-${i}`} className="calendar-day empty"></div>
  ));

  // Create an array for the actual days of the month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-days">
      {emptyDays}
      {daysArray.map((day) => (
        <Day
          key={day}
          day={day}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onClick={onDayClick}
          events={events}
        />
      ))}
    </div>
  );
};

export default Days;
