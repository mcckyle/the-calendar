//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 9 January 2026
//Description: This file contains the event modal for the Saint Louis React calendar project.

import React, { useEffect, useRef } from "react";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventPanel.css";

const EventPanel = ({ selectedEvent, onClose }) => {
  const panelRef = useRef(null);

  if ( ! selectedEvent)
  {
      return null;
  }

  //Focus the panel when it opens for accessibility purposes...
  useEffect(() => {
    if (selectedEvent && panelRef.current)
    {
      panelRef.current.focus();
    }
  }, [selectedEvent]);

  //Render the EventCard component for the selected event...
  return (
    <div className="event-modal-root">
      {/* Overlay / Backdrop. */}
      <div
        className="event-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel. */}
      <section
        ref={panelRef}
        className="event-panel visible"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-panel-title"
        tabIndex={-1}
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
          <EventCard {...selectedEvent} />
        </div>
      </section>
    </div>
  );
};

export default EventPanel;
