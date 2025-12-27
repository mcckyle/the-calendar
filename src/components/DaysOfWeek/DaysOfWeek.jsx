//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 26 December 2025
//Description: This file contains the row of date labels for the Saint Louis React calendar project.

import React from "react";
import "./DaysOfWeek.css";

const DaysOfWeek = ({ weekDays = [] }) => {
  const todayString = new Date().toDateString();

  return (
    <div className="days-of-week" role="row">
      {weekDays.map((day) => {
        const isToday = day.toDateString() === todayString;

        return (
          <div
            key={day.toISOString()}
            className={`day-item ${isToday ? "today" : ""}`}
            role="columnheader"
            aria-current={isToday ? "date" : undefined}
            aria-label={day.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          >
            <span className="day-label">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <span className="day-date">
              {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
