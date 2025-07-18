//Filename: EventCards.jsx
//Author: Kyle McColgan
//Date: 16 July 2025
//Description: This file contains the EventCards.jsx component.

import React from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import './EventCards.css';

const EventCards = ({ selectedDate, events }) => {

  if (!selectedDate || isNaN(selectedDate))
  {
    return <div className="event-cards-message">Please select a valid date!!</div>;
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
    <section className="event-cards" aria-live="polite" aria-label="Event cards section">
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            startTime={event.startTime}
            endTime={event.endTime}
            allDay={event.allDay}
            description={event.description}
          />
        ))
      ) : (
        <p className="event-cards-message">No events for this day!</p>
      )}
    </section>
  );
};

export default EventCards;
