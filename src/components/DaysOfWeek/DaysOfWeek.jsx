//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 2 March 2026
//Description: This file contains the row of date labels for the Saint Louis calendar React project.

import React, { useMemo } from "react";
import "./DaysOfWeek.css";

const DaysOfWeek = ({ weekDays = [] }) => {
  const todayString = useMemo(() => new Date().toISOString().split("T")[0], []);

  return (
    <div className="days-of-week" role="row" aria-label="Days of the week">
      {weekDays.map((day) => {
        const dayString = day.toISOString().split("T")[0];
        const isToday = dayString === todayString;

        //Use UTC for labels.
        const weekday = day.toUTCString().split(",")[0]; //"Fri".
        const date = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }).format(day);

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
              dateTime={day.toISOString().split("T")[0]}
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
