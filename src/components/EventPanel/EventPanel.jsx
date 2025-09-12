//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 12 September 2025
//Description: This file contains the event modal for the Saint Louis React calendar project.

import React from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import './EventPanel.css';

const EventPanel = ({ selectedEvent, onClose }) => {
  if(!selectedEvent)
  {
      return (
        <section className="event-panel empty" aria-live="polite" aria-label="Event Panel">
          <p className="no-event">No event selected!</p>
        </section>
      );
  }

  // Render the EventCard component for the selected event. ***DO NOT MOVE THE OPENING PARENTHESIS ON RETURN!!!
  return(
    <>
      <div className="event-overlay" onClick={onClose} />
        <section
          className="event-panel"
          role="dialog"
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
            date={selectedEvent.date || "1970-01-01"}
            startTime={selectedEvent.startTime || "No Start Time"}
            endTime={selectedEvent.endTime || "No End Time"}
            allDay={selectedEvent.allDay || false}
            description={selectedEvent.description || "No Description"}
            venueName={selectedEvent.venueName || "Unknown venue"}
            venueAddress={selectedEvent.venueAddress || ""}
            venueCity={selectedEvent.venueCity || ""}
            venueState={selectedEvent.venueState || ""}
            url={selectedEvent.url || ""}
          />
        </section>
      </>
  );
};

export default EventPanel;
