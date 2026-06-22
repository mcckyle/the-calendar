//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 22 June 2026
//Description: This file contains the columns component for the Saint Louis React calendar project.

import React, { useMemo } from "react";
import { getChicagoISODate } from "../../utils/dateHelpers";
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
  const dayISO = getChicagoISODate(day);
  const isToday = useMemo(
    () => dayISO === getChicagoISODate(),
    [dayISO]
  );

  const ariaLabel = `Events for ${day.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })}`;

  return (
    <section
      className={`weekday-column ${isToday ? "is-today" : ""}`}
      aria-label={ariaLabel}
    >
      {HOURS.map((hour) => (
        <TimeSlot
          key={`${dayISO}-${hour}`}
          hour={hour} //Preserves stable test hooks, keeps slot identity explicit.
          label={convertTo12HourFormat(`${hour}:00`)} // Convert hour to preferred 12-hour format.
          events={groupedEvents[hour] ?? []} // Events for this hour, default to empty array.
          onEventClick={onEventClick}
        />
        ))}
    </section>
  );
};

export default WeekDayColumn;
