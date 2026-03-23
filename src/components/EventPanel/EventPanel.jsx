//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 16 March 2026
//Description: This file contains the event modal for the Saint Louis Events project.

import React, { useEffect, useRef } from "react";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventPanel.css";

const EventPanel = ({ selectedEvent, onClose }) => {
  const panelRef = useRef(null);

  //Focus the panel when it opens & handle Escape key...
  useEffect(() => {
    if (!selectedEvent)
    {
      return;
    }

    const panel = panelRef.current;
    panel?.focus();

    //Close on Escape key...
    const handleKeyDown = (e) => {
      if (e.key === "Escape")
      {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent, onClose]);

  if (!selectedEvent)
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
        onClick={(e) => e.stopPropagation()}
      >
        <header className="event-panel-header">
          <h2 id="event-panel-title" className="event-panel-title">
            Event Details
          </h2>
          <button
            type="button"
            className="close-button"
            aria-label="Close event details"
            onClick={onClose}
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
