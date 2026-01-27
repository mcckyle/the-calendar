//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 26 January 2026
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

  //Focus the panel when it opens...
  useEffect(() => {
    panelRef.current?.focus();
  }, [selectedEvent]);

  //Close on Escape key...
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  //Render the EventCard component for the selected event...
  return (
    <div className="event-modal-root">
      <div className="event-overlay" onClick={onClose} aria-hidden="true" />

      {/* Panel. */}
      <section
        ref={panelRef}
        className="event-panel visible"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-panel-title"
        aria-describedby="event-panel-body"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
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

        <div id="event-panel-body" className="event-panel-body">
          <EventCard {...selectedEvent} />
        </div>
      </section>
    </div>
  );
};

export default EventPanel;
