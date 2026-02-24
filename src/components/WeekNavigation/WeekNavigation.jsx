//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 24 February 2026
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
    <nav className="week-navigation" aria-label="Week navigation" aria-live="polite">
      <button
        type="button"
        className="nav-button prev-week"
        aria-label="Previous week"
        onClick={() => changeWeek(-1)}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <time className="month-year" dateTime={dateISO}>
        {monthYearLabel}
      </time>

      <button
        type="button"
        className="nav-button next-week"
        aria-label="Next week"
        onClick={() => changeWeek(1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
};

export default WeekNavigation;
