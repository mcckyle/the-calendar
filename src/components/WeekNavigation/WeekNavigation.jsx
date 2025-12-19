//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 16 December 2025
//Description: This file contains the week navigation functionality for the Saint Louis React calendar project.

import React from "react";
import { useCalendarContext } from "../Calendar/CalendarContext.jsx";
import "./WeekNavigation.css";

const WeekNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  const monthYearLabel = currentDate.toLocaleDateString('en-US', {
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="week-navigation" aria-label="Week navigation">
      <button
        className="nav-button"
        type="button"
        aria-label="Previous week"
        onClick={() => changeWeek(-1)}
      >
        ‹
      </button>

      <time
        className="month-year"
        dateTime={currentDate.toISOString()}
        aria-live="polite"
      >
        {monthYearLabel}
      </time>

      <button
        className="nav-button"
        type="button"
        aria-label="Next week"
        onClick={() => changeWeek(1)}
      >
        ›
      </button>
    </nav>
  );
};

export default WeekNavigation;
