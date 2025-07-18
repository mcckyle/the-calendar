//Filename: Day.jsx
//Author: Kyle McColgan
//Date: 16 July 2025
//Description: This file contains the Day.jsx component for the local Saint Louis React calendar project.

import React from 'react';
import './Day.css';

const Day = ({ day, selectedDate, currentDate, onClick, events }) => {
  const isSelected =
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === currentDate.getMonth() &&
    selectedDate?.getFullYear() === currentDate.getFullYear();

  // Find if there are any events for this day.
  const dayEvents = events.filter((event) => {
    const eventDate = new Date(`${event.date}T00:00:00`); //Enforce consistent parsing.
    return eventDate.getDate() === day &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear();
  });

  return (
    <div
      className={`calendar-day ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(day)}
      title={dayEvents[0]?.title}
      aria-label={`Day${day} ${isSelected ? ' (selected)' : ''}${dayEvents.length > 0 ? ', has event' : ''}`}
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
