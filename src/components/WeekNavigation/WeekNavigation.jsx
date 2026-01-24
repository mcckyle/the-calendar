//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 23 January 2026
//Description: This file contains the week navigation functionality for the Saint Louis React calendar project.

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
        className="nav-button"
        type="button"
        aria-label="Previous week"
        title="Previous week"
        onClick={() => changeWeek(-1)}
      >
        ‹
      </button>

      <time
        className="month-year"
        dateTime={dateISO}
        aria-current="date"
        aria-live="polite"
      >
        <span>{monthYearLabel}</span>
      </time>

      <button
        className="nav-button"
        type="button"
        aria-label="Next week"
        title="Next week"
        onClick={() => changeWeek(1)}
      >
        ›
      </button>
    </nav>
  );
};

export default WeekNavigation;
