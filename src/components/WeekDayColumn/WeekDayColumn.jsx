//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 10 April 2026
//Description: This file contains the columns component for the Saint Louis React calendar project.

import React, { useMemo } from "react";
import TimeSlot from "../TimeSlot/TimeSlot.jsx";
import "./WeekDayColumn.css";

//Generate hours from 9 AM to 9 PM.
const HOURS = Array.from({ length: 13 }, (_, i) => i + 9);

const WeekDayColumn = ({
  day,
  groupedEvents,
  onEventClick,
  convertTo12HourFormat,
}) => {
  const dayISO = day.toISOString().split("T")[0];
  const todayISO = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );
  const isToday = dayISO === todayISO;

  const ariaLabel = useMemo(() => {
    return `Events for ${day.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })}`;
  }, [day]);

  return (
    <section
      className={`weekday-column${isToday ? " is-today" : ""}`}
      aria-label={ariaLabel}
    >
      <div className="time-slots" role="list">
        {HOURS.map((hour) => (
          <TimeSlot
            key={`${dayISO}-${hour}`}
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
