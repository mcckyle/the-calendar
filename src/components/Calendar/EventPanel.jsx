import React from 'react';
import EventCard from './EventCard';
import './EventPanel.css';

const EventPanel = ({ selectedEvent, onClose }) => {
  // Render the EventCard component for the selected event
  return (
    <div className="event-panel">
      <button onClick={onClose}>Close</button>
      <h2>Event Details</h2>

      {/* Use EventCard to display the selected event */}
      <EventCard
        title={selectedEvent.title}
        date={selectedEvent.date} 
        startTime={selectedEvent.startTime} 
        endTime={selectedEvent.endTime} // Pass the endTime
        allDay={selectedEvent.allDay}   // Pass the allDay flag
        description={selectedEvent.description}
      />
    </div>
  );
};

export default EventPanel;
