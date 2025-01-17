import React from 'react';
import EventCards from './EventCards';
import './EventPanel.css';

const EventPanel = ({ selectedEvent, onClose }) => {
  // Helper function to format dates.
  const formatDate = (date) => {
    if (date instanceof Date)
	{
      return date.toLocaleString(); // Format date as a readable string.
    }
    return date; // If it's not a Date, just return it as is.
  };

  return (
    <div className="event-panel">
      <button onClick={onClose}>Close</button>
      <h2>Event Details</h2>
      {selectedEvent ? (
        <div>
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <p>
            {formatDate(selectedEvent.startTime)} - {formatDate(selectedEvent.endTime)}
          </p>
        </div>
      ) : (
        <p>No event selected.</p>
      )}
    </div>
  );
};

export default EventPanel;
