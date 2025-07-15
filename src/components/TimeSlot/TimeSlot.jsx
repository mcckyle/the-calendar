//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains the TimeSlot.jsx component for the local Saint Louis React calendar project.

import React from 'react';
import './TimeSlot.css';

const TimeSlot = ({ hour, label, events, onEventClick }) => {
  // Adjust the event startTime to local time.
  const convertToLocalTime = (startTime) => {
    const localTime = new Date(startTime);
    return localTime; // Automatically adjusts to the local timezone.
  };
    // Helper function to convert time to 12-hour format.
    const convertTo12HourFormat = (time) => {
	  const [hour, minute] = time.split(':').map(num => parseInt(num));
	  const isPM = hour >= 12;
	  const adjustedHour = hour % 12 || 12; // Convert hour to 12-hour format.
	  const adjustedMinute = minute.toString().padStart(2, '0');
	  return `${adjustedHour}:${adjustedMinute} ${isPM ? 'PM' : 'AM'}`;
	};

  return (
    <section className="time-slot" aria-label={`Time Slot: ${label}`}>
      <header className="time-label">{label}</header>
      <div className="slot-events">
        {events.length > 0 ? (
          events.map((event) => (
            <button
              key={event.id}
              className="event"
              onClick={() => onEventClick(event)} //Notify parent when an event is clicked.
              aria-label={`View event: ${event.title}`}
            >
              <strong>{event.title}</strong> {/* Display only event title */}
            </button>
          ))
        ) : (
          <div className="slot-empty">No Events!</div> // Placeholder for empty time slots.
        )}
      </div>
    </section>
  );
};

export default TimeSlot;
