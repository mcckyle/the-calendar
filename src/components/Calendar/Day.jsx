import React from 'react';
import './Day.css';

const Day = ({ day, selectedDate, currentDate, onClick, events }) => {
  const isSelected =
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === currentDate.getMonth() &&
    selectedDate?.getFullYear() === currentDate.getFullYear();

  // Find if there are any events for this day
  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear();
  });

  return (
    <div
      className={`calendar-day ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(day)}
    >
      <span>{day}</span>
      {dayEvents.length > 0 && (
        <div className="event-indicator">
          <span>{dayEvents[0]?.title}</span>
        </div>
      )}
    </div>
  );
};

export default Day;
