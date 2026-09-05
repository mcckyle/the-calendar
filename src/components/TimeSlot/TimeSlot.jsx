//Filename: TimeSlot.jsx
//Author: Kyle McColgan
//Date: 4 September 2026
//Description: This file contains the individual time slots for the Saint Louis Events project.

import React from "react";
import EventChip from "../EventChip/EventChip.jsx";
import "./TimeSlot.css";

const TimeSlot = ({ hour, label, events, onEventClick, dayISO }) => {

  const labelId = `time-${dayISO}-${hour}`;
  const hasEvents = events.length > 0;

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
          hasEvents
            ? `${events.length} ${events.length === 1 ? "event" : "events"}`
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
