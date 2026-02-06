//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 5 February 2026
//Description: This file contains the week navigation functionality for the Saint Louis Events project.

import React from "react";
import { useCalendarContext } from "../Calendar/CalendarContext.jsx";
import "./WeekNavigation.css";

const WeekNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  const monthYearLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dateISO = currentDate.toISOString().split("T")[0];

  return (
    <nav className="week-navigation" aria-label="Week navigation">
      <button
        type="button"
        className="nav-button"
        aria-label="Previous week"
        onClick={() => changeWeek(-1)}
      >
        ‹
      </button>

      <time
        className="month-year"
        dateTime={dateISO}
        aria-live="polite"
      >
        {monthYearLabel}
      </time>

      <button
        type="button"
        className="nav-button"
        aria-label="Next week"
        onClick={() => changeWeek(1)}
      >
        ›
      </button>
    </nav>
  );
};

export default WeekNavigation;
