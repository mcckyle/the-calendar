//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 16 February 2026
//Description: This file contains the row of date labels for the Saint Louis React calendar project.

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
            className={`day-item${isToday ? " today" : ""}`}
            role="columnheader"
            aria-current={isToday ? "date" : undefined}
            tabIndex={0}
          >
            <span className="day-label">{weekday}</span>
            <span className="day-date">{date}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
