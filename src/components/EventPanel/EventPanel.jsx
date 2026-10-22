//Filename: EventPanel.jsx
//Author: Kyle McColgan
//Date: 22 October 2026
//Description: This file contains the event modal for the Saint Louis Events project.

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import EventCard from "../EventCard/EventCard.jsx";
import "./EventPanel.css";

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const EventPanel = ({ selectedEvent, onClose }) => {
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  //Focus the panel when it opens & handle Escape key...
  useEffect(() =>
  {
    if ((!selectedEvent) || (!panelRef.current))
    {
      return undefined;
    }

    const panel = panelRef.current;
    previousFocusRef.current = document.activeElement;

    //Prevent the application from scrolling behind the panel.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.focus();

    //Close on Escape.
    const handleKeyDown = (event) =>
    {
      if (event.key === "Escape")
      {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab")
      {
        return;
      }

      const focusableElements = [
        ...panel.querySelectorAll(FOCUSABLE_ELEMENTS),
      ].filter(
        (element) =>
          !element.hasAttribute("hidden") &&
          element.getAttribute("aria-hidden") !== "true");

      if (focusableElements.length === 0)
      {
        event.preventDefault();
        panel.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if ((event.shiftKey) && ((activeElement === firstElement) || (activeElement === panel)))
      {
        event.preventDefault();
        lastElement.focus();
      }
      else if ((!event.shiftKey) && ((activeElement === lastElement) || (!panel.contains(activeElement))))
      {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
    {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      const previousFocus = previousFocusRef.current;

      //Return focus to the event that opened the panel.
      if ((previousFocus instanceof HTMLElement) && (previousFocus.isConnected))
      {
        previousFocus.focus();
      }
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
            Event details
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
