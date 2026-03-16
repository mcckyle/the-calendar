//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 16 March 2026
//Description: This file contains the row of date labels for the Saint Louis calendar React project.

import React, { useMemo } from "react";
import "./DaysOfWeek.css";

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const DaysOfWeek = ({ weekDays = [] }) => {
  const todayISO = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  return (
    <div className="days-of-week" role="row" aria-label="Days of the week">
      {weekDays.map((day) => {
        const iso = day.toISOString().split("T")[0];
        const isToday = iso === todayISO;

        return (
          <div
            key={iso}
            className={`day-item${isToday ? " is-today" : ""}`}
            role="columnheader"
            aria-current={isToday ? "date" : undefined}
          >
            <span className="day-label">{weekdayFormatter.format(day)}</span>
            <time
              className="day-date"
              dateTime={iso}
            >
              {dateFormatter.format(day)}
            </time>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
