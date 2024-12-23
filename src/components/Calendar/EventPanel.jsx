import React from 'react';
import EventCards from './EventCards';

const EventPanel = ({ selectedDate, events, onClose }) => (
  <div className="event-panel">
    <button onClick={onClose} className="close-button">
      Close
    </button>
    <EventCards selectedDate={selectedDate} events={events} />
  </div>
);

export default EventPanel;
