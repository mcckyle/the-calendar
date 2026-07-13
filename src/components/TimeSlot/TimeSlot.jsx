//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 13 July 2026
//Description: This file contains the individual time slots for the Saint Louis Events project.

import React from "react";
import "./TimeSlot.css";

const TimeSlot = ({ label, events, onEventClick }) => {
  return (
    <div
      className="time-slot"
      role="group"
      aria-labelledby={`time-${label.replace(/\s+/g, '-')}`}
    >
      <time id={`time-${label.replace(/\s+/g, '-')}`} className="time-label">{label}</time>

      <div className="slot-events" role="list">
        {events.map((event) => (
          <button
            key={event.id}
            type="button"
            className="event-chip"
            onClick={() => onEventClick(event)} //Notify parent when an event is clicked.
            aria-label={`View details for ${event.title}`}
          >
            <span className="event-title">{event.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
