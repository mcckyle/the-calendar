//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 7 August 2026
//Description: This file contains the event modal for the Saint Louis Events project.

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventPanel.css";

const EventPanel = ({ selectedEvent, onClose }) => {
  const panelRef = useRef(null);

  //Focus the panel when it opens & handle Escape key...
  useEffect(() =>
  {
    if (!selectedEvent)
    {
      return;
    }

    const panel = panelRef.current;
    panel?.focus();

    //Prevent the application from scrolling behind the panel.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    //Close on Escape.
    const handleKeyDown = (event) =>
    {
      if (event.key === "Escape")
      {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
    {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent, onClose]);

  if (!selectedEvent)
  {
    return null;
  }

  //Render the EventCard component for the selected event...
  return createPortal(
    <div className="event-modal-root">
      <button
        type="button"
        className="event-overlay"
        aria-label="Close event details overlay"
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        className="event-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-panel-title"
        aria-describedby="event-panel-content"
        tabIndex={-1}
      >
        <header className="event-panel-header">
          <p id="event-panel-title" className="event-panel-title">
            Event Details
          </p>
          <button
            type="button"
            className="close-button"
            aria-label="Close event details button"
            onClick={onClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div id="event-panel-content" className="event-panel-body">
          <EventCard {...selectedEvent} />
        </div>
      </aside>
    </div>,
  document.body
  );
};

export default EventPanel;
