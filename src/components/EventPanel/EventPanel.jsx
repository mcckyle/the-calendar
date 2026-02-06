//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 5 February 2026
//Description: This file contains the event modal for the Saint Louis Events project.

import React, { useEffect, useRef } from "react";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventPanel.css";

const EventPanel = ({ selectedEvent, onClose }) => {
  const panelRef = useRef(null);

  //Focus the panel when it opens...
  useEffect(() => {
    if ( ! selectedEvent)
    {
      return;
    }

    panelRef.current?.focus();

    //Close on Escape key...
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [selectedEvent, onClose]);

  if ( ! selectedEvent)
  {
    return null;
  }

  //Render the EventCard component for the selected event...
  return (
    <div className="event-modal-root" role="presentation">
      <div className="event-overlay" onClick={onClose} aria-hidden="true" />

      {/* Panel. */}
      <section
        ref={panelRef}
        className="event-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-panel-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation() }
      >
        <header className="event-panel-header">
          <h2 id="event-panel-title">Event Details</h2>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close event details"
          >
            ✕
          </button>
        </header>

        <div className="event-panel-body">
          <EventCard {...selectedEvent} />
        </div>
      </section>
    </div>
  );
};

export default EventPanel;
