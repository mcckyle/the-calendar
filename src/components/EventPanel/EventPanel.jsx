//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains the EventPanel component for the local Saint Louis React calendar project.

import React from 'react';
import EventCard from '../EventCard/EventCard.jsx';
import './EventPanel.css';

const EventPanel = ({ selectedEvent, onClose }) => {
  if(!selectedEvent)
  {
      return (
        <section className="event-panel" aria-live="polite">
          <p className="no-event">No event selected!</p>
        </section>
      );
  }

  // Render the EventCard component for the selected event.
  return (
    <section className="event-panel" role="dialog" aria-labelledby="eventDetailsTitle">
      <header className="event-panel-header">
        <h2 id="eventDetailsTitle">Event Details</h2>
        <button className="close-button" onClick={onClose} aria-label="Close event details">
          ✕
        </button>
      </header>


      {/* Use EventCard to display the selected event */}
      <EventCard
        title={selectedEvent.title || "Untitled Event"}
        date={selectedEvent.date || "1970-01-01"}
        startTime={selectedEvent.startTime || null}
        endTime={selectedEvent.endTime || null}
        allDay={selectedEvent.allDay || false}
        description={selectedEvent.description || ""}
		/>
    </section>
  );
};

export default EventPanel;
