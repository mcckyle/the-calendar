//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 7 August 2026
//Description: This file contains the individual time slots for the Saint Louis Events project.

import React from "react";
import EventChip from "../EventChip/EventChip.jsx";
import "./TimeSlot.css";

const TimeSlot = ({ hour, label, events, onEventClick }) => {

  const labelId = `time-${hour}`;

  return (
    <div
      className="time-slot"
      role="group"
      aria-labelledby={labelId}
    >
      <span id={labelId} className="time-label">{label}</span>
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
          <div key={event.id} role="listitem">
            <EventChip event={event} onClick={onEventClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
