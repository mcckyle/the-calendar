import React from 'react';
import EventCards from './EventCards';

const EventPanel = ({ selectedDate, selectedEvent, onClose }) => {
  return (
    <div className="event-panel">
      <button onClick={onClose}>Close</button>
      <h2>Event Details</h2>
      {selectedEvent ? (
        <div>
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <p>
            {selectedEvent.startTime} - {selectedEvent.endTime}
          </p>
        </div>
      ) : (
        <p>No event selected.</p>
      )}
    </div>
  );
};

export default EventPanel;
