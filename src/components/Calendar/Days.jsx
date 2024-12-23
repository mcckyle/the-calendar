// Days.jsx
import React from 'react';
import './Days.css';

const Days = ({ currentDate, selectedDate, onDayClick, events }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  // Helper function to filter events for a specific day
  const getEventsForDay = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    console.log(`Checking events for: ${dayString}`);
    return events.filter(event => event.date === dayString);
  };

  return (
    <div className="days-grid">
      {/* Render empty days */}
      {emptyDays.map((_, index) => (
        <div key={`empty-${index}`} className="calendar-day empty"></div>
      ))}
      {/* Render actual days */}
      {daysArray.map((day) => {
        const eventsForDay = getEventsForDay(day);

        return (
          <div
            key={day}
            className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''}`}
            onClick={() => onDayClick(day)}
          >
            {day}
            {eventsForDay.length > 0 && (
              <div className="event-marker">{eventsForDay.length} Event(s)</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Days;
