//Filename: EventChip.jsx
//Author: Kyle McColgan
//Date: 12 November 2026
//Description: This file contains the event chips for the Saint Louis Events project.

import React from "react";
import "./EventChip.css";

const EventChip = ({ event, onClick }) => {
  return (
    <button
      type="button"
      className="event-chip"
      onClick={() => onClick(event)}
      aria-label={`View details for ${event.title}`}
    >
      <span className="event-chip-title">{event.title}</span>
    </button>
  );
};

export default EventChip;
