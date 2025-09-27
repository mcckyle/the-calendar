//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 24 September 2025
//Description: This file contains the individual time slots for the Saint Louis React calendar project.

import React from 'react';
import './TimeSlot.css';

const TimeSlot = ({ label, events, onEventClick }) => {
  return (
    <section className="time-slot" aria-label={`Time Slot: ${label}`}>
      <h3 className="time-label">{label}</h3>

      <div className="slot-events">
        {events.length > 0 ? (
          events.map((event) => (
            <button
              key={event.id}
              className="event"
              onClick={() => onEventClick(event)} //Notify parent when an event is clicked.
              aria-label={`View event: ${event.title}`}
            >
              <span className="event-title">{event.title}</span> {/* Display only event title */}
            </button>
          ))
        ) : (
          // Placeholder for empty time slots.
          <p className="slot-empty">No Events!</p>
        )}
      </div>
    </section>
  );
};

export default TimeSlot;
