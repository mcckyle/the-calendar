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
    <div className="time-slot">
      <span className="time-label">{label}</span>
      <div className="events">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="event"
              onClick={() => onEventClick(event)} //Notify parent when an event is clicked.
            >
              <strong>{event.title}</strong> {/* Display only event title */}
            </div>
          ))
        ) : (
          <div className="no-events">No events</div> // Placeholder for empty time slots.
        )}
      </div>
    </div>
  );
};

export default TimeSlot;