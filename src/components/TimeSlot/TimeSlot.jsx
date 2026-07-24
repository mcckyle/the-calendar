//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 24 July 2026
//Description: This file contains the individual time slots for the Saint Louis Events project.

import React from "react";
import EventChip from "../EventChip/EventChip.jsx";
import "./TimeSlot.css";

const TimeSlot = ({ label, events, onEventClick }) => {

  const labelId = `time-${label.replace(/\s+/g, "-")}`;

  return (
    <div
      className="time-slot"
      role="group"
      aria-labelledby={labelId}
    >
      <time id={labelId} className="time-label">{label}</time>
      <div
        className="slot-events"
        role="list"
        aria-label={
          events.length
            ? `${events.length} events`
            : "No scheduled events"
        }
      >
        {events.map((event) => (
          <EventChip
            key={event.id}
            event={event}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
