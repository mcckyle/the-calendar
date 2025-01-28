import React from 'react';
import EventCard from './EventCard';
import './EventPanel.css';

const EventPanel = ({ selectedEvent, onClose }) => {
  // Render the EventCard component for the selected event.
  return (
    <div className="event-panel">
      <button onClick={onClose}>Close</button>
      <h2>Event Details</h2>

      {/* Use EventCard to display the selected event */}
		<EventCard
		  title={selectedEvent.title || "Untitled Event"}
		  date={selectedEvent.date || "1970-01-01"}
		  startTime={selectedEvent.startTime || null}
		  endTime={selectedEvent.endTime || null}
		  allDay={selectedEvent.allDay || false}
		  description={selectedEvent.description || ""}
		/>
    </div>
  );
};

export default EventPanel;
