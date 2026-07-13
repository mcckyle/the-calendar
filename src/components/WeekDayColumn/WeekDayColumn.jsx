//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 13 July 2026
//Description: This file contains the columns component for the Saint Louis React calendar project.

import React, { useMemo } from "react";
import { getChicagoISODate } from "../../utils/dateHelpers";
import TimeSlot from "../TimeSlot/TimeSlot.jsx";
import "./WeekDayColumn.css";

//Generate hours from 9 AM to 9 PM.
const START_HOUR = 9;
const END_HOUR = 21;
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

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
