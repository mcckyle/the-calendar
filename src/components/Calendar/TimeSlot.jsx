import React from 'react';

const TimeSlot = ({ hour, label, events, onEventClick }) => {
  const renderTimeLabel = (hour) => `${hour}:00`; // Example format

  return (
    <div className="time-slot">
      <span className="time-label">{label}</span>
      <div className="events">
        {events.map((event) => (
          <div
            key={event.id}
            className="event"
            onClick={() => onEventClick(event)} // Handle click
          >
            <strong>{event.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;