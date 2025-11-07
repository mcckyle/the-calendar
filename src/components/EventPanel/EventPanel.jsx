//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 05 November 2025
//Description: This file contains the event modal for the Saint Louis React calendar project.

import React from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import './EventPanel.css';

const EventPanel = ({ selectedEvent, onClose }) => {
  if (!selectedEvent)
  {
      return (
        <section className="event-panel empty" aria-live="polite" aria-label="Event Panel">
          <p className="no-event">No event selected!</p>
        </section>
      );
  }

  //Render the EventCard component for the selected event.
  return (
    <>
      <div className="event-overlay" onClick={onClose} aria-hidden="true" />
      <section
        className="event-panel visible"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eventDetailsTitle"
        data-testid="event-panel"
      >
        <header className="event-panel-header">
          <h2 id="eventDetailsTitle">Event Details</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close event details"
          >
            ✕
          </button>
        </header>


        {/* Use EventCard to display the selected event */}
        <EventCard
          title={selectedEvent.title || "Untitled Event"}
          date={selectedEvent.date}
          startTime={selectedEvent.startTime}
          endTime={selectedEvent.endTime}
          allDay={selectedEvent.allDay}
          description={selectedEvent.description}
          venueName={selectedEvent.venueName}
          venueAddress={selectedEvent.venueAddress}
          venueCity={selectedEvent.venueCity}
          venueState={selectedEvent.venueState}
          url={selectedEvent.url}
        />
      </section>
    </>
  );
};

export default EventPanel;
