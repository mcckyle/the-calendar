//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 2 February 2026
//Description: This file contains the individual time slots for the Saint Louis React calendar project.

import React from "react";
import "./TimeSlot.css";

const TimeSlot = ({ label, events, onEventClick }) => {
  return (
    <div
      className="time-slot"
      role="group"
      aria-label={`Events at ${label}`}
      tabIndex={0}
    >
      <span className="time-label">{label}</span>

      <div className="slot-events" role="list">
        {events.length > 0 ? (
          events.map((event) => (
            <button
              key={event.id}
              className="event"
              type="button"
              onClick={() => onEventClick(event)} //Notify parent when an event is clicked.
              aria-label={`View event: ${event.title}`}
              title={event.title}
            >
              {event.title}
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
