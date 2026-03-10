//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 9 March 2026
//Description: This file contains the columns component for the Saint Louis React calendar project.

import React, { useMemo } from "react";
import TimeSlot from "../TimeSlot/TimeSlot.jsx";
import "./WeekDayColumn.css";

const WeekDayColumn = ({
  day,
  groupedEvents,
  onEventClick,
  convertTo12HourFormat,
}) => {
  // Generate hours from 9 AM to 9 PM.
  const hours = useMemo(() => Array.from({ length: 13 }, (_, i) => i + 9), []);
  const dayISO = day.toISOString().split("T")[0];
  const todayISO = useMemo(() => new Date().toISOString().split("T")[0], []);
  const isToday = dayISO === todayISO;

  const ariaLabel = `Events for ${day.toUTCString().split(" ").slice(0, 4).join(" ")}`;

  return (
    <section
      className={`weekday-column${isToday ? " is-today" : ""}`}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="time-slots" role="list">
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
