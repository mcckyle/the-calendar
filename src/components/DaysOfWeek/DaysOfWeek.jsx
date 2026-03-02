//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 1 March 2026
//Description: This file contains the row of date labels for the Saint Louis calendar React project.

import React, { useMemo } from "react";
import "./DaysOfWeek.css";

const DaysOfWeek = ({ weekDays = [] }) => {
  const todayString = useMemo(() => new Date().toDateString(), []);

  return (
    <div className="days-of-week" role="row" aria-label="Days of the week">
      {weekDays.map((day) => {
        const isToday = day.toDateString() === todayString;

        const weekday = day.toLocaleDateString("en-US", { weekday: "short" });
        const date = day.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        return (
          <div
            key={day.toISOString()}
            className={`day-item${isToday ? " is-today" : ""}`}
            role="columnheader"
            aria-current={isToday ? "date" : undefined}
          >
            <span className="day-label">{weekday}</span>
            <time
              className="day-date"
              dateTime={day.toISOString().split("T"[0])}
            >
              {date}
            </time>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
