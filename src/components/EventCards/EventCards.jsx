//Filename: EventCards.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains the EventCards.jsx component.

import React from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import './EventCards.css';

const EventCards = ({ selectedDate, events }) => {

  if (!selectedDate || isNaN(selectedDate))
  {
    return <p>Please select a valid date.</p>;
  }

	const filteredEvents = events.filter((event) => {
	  const eventDate = new Date(event.date); // Parse event date
	  if (isNaN(eventDate))
	  {
		console.error(`Invalid event date: ${event.date}`);
		return false;
	  }
	  return eventDate.toDateString() === selectedDate.toDateString();
	});

  return (
    <div className="event-cards">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={new Date(event.date).toLocaleDateString()}
            time={event.time}
            description={event.description}
          />
        ))
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
};

export default EventCards;
