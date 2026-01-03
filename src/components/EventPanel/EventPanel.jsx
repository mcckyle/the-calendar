//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 31 December 2025
//Description: This file contains the event modal for the Saint Louis React calendar project.

import React from "react";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventPanel.css";

const EventPanel = ({ selectedEvent, onClose }) => {
  if (!selectedEvent)
  {
      return null;
  }

  //Render the EventCard component for the selected event...
  return (
    <div className="event-modal-root">
      <div
        className="event-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <section
        className="event-panel visible"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-panel-title"
      >
        <header className="event-panel-header">
          <h2 id="event-panel-title">Event Details</h2>

          <button
            className="close-button"
            type="button"
            onClick={onClose}
            aria-label="Close event details"
          >
            ✕
          </button>
        </header>

        <div className="event-panel-body">
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
        </div>
      </section>
    </div>
  );
};

export default EventPanel;
