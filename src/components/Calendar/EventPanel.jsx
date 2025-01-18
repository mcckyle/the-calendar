import React from 'react';
import EventCard from './EventCard';
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

	// Render the EventCard component for the selected event
	return (
	  <div className="event-panel">
		<button onClick={onClose}>Close</button>
		<h2>Event Details</h2>

		{/* Use EventCard to display the selected event */}
		<EventCard
		  title={selectedEvent.title}
		  date={selectedEvent.title} // Format date
		  time={selectedEvent.title} // Format time
		  description={selectedEvent.description}
		/>
	  </div>
	);
};

export default EventPanel;
