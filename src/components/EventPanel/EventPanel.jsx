//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 23 April 2026
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

    //Prevent background scroll.
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    //Close on Escape key...
    const handleKeyDown = (event) => {
      if (event.key === "Escape")
      {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
    {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
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
        aria-describedby="event-panel-content"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
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

        <div id="event-panel-content" className="event-panel-body">
          <EventCard {...selectedEvent} />
        </div>
      </section>
    </div>
  );
};

export default EventPanel;
