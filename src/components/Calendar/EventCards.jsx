import React from 'react';
import EventCard from './EventCard';
import './EventCards.css';

const EventCards = ({ selectedDate, events }) => {
  if (!selectedDate || isNaN(selectedDate)) {
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
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.time}</p>
            <p>{event.location}</p>
          </div>
        ))
      ) : (
        <p>No events for this day.</p>
      )}
    </div>
  );
};

export default EventCards;
