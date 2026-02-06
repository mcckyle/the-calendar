//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 5 February 2026
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
  const todayString = useMemo(() => new Date().toDateString(), []);
  const isToday = day.toDateString() === todayString;

  return (
    <section
      className={`weekday-column ${isToday ? "today" : ""}`}
      role="region"
      aria-label={`Events for ${day.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`}
      aria-current={isToday ? "date" : undefined}
      tabIndex={0}
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
