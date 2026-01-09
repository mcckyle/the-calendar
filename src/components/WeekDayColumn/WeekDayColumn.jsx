//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 8 January 2026
//Description: This file contains the columns component for the Saint Louis React calendar project.

import React from "react";
import TimeSlot from "../TimeSlot/TimeSlot.jsx";
import "./WeekDayColumn.css";

const WeekDayColumn = ({
  day,
  groupedEvents,
  onEventClick,
  convertTo12HourFormat,
}) => {
  // Generate hours from 9 AM to 9 PM (13 slots total).
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);

  return (
    <section
      className={`weekday-column ${day.toDateString() === new Date().toDateString() ? 'today' : ''}`}
      role="region"
      aria-label={`Schedule for ${day.toDateString()}`}
      title={day.toDateString() === new Date().toDateString() ? "today" : undefined}
    >
      <div className="time-slots">
        {hours.map((hour) => (
          <TimeSlot
            key={hour}
            hour={hour}
            label={convertTo12HourFormat(`${hour}:00`)} // Convert hour to preferred 12-hour format.
            events={groupedEvents[hour] ?? []} // Events for this hour, default to empty array.
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </section>
  );
};

export default WeekDayColumn;
