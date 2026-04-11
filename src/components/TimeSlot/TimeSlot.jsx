//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 7 April 2026
//Description: This file contains the individual time slots for the Saint Louis Events project.

import React from "react";
import "./TimeSlot.css";

const TimeSlot = ({ label, events, onEventClick }) => {
  const hasEvents = events.length > 0;

  return (
    <div
      className="time-slot"
      role="group"
      aria-label={`Events at ${label}`}
    >
      <span className="time-label" aria-hidden="true">{label}</span>

      <div className="slot-events" role="list">
        {hasEvents ? (
          events.map((event) => (
            <button
              key={event.id}
              type="button"
              className="event-chip"
              onClick={() => onEventClick(event)} //Notify parent when an event is clicked.
              aria-label={`View event: ${event.title}`}
              title={event.title}
            >
              <span className="event-title">{event.title}</span>
            </button>
          ))
        ) : (
          // Placeholder for empty time slots.
          <span className="slot-empty" aria-hidden="true">—</span>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
