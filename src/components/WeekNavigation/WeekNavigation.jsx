//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 16 March 2026
//Description: This file contains the week navigation functionality for the Saint Louis Events project.

import React from "react";
import { useCalendarContext } from "../Calendar/CalendarContext.jsx";
import "./WeekNavigation.css";

const WeekNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC", //Explicitly force UTC.
  });

  const isoDate = currentDate.toISOString().split("T")[0];

  return (
    <nav className="week-navigation" aria-label="Calendar week navigation">
      <button
        type="button"
        className="week-nav-button"
        aria-label="Go to previous week"
        onClick={() => changeWeek(-1)}
      >
        ‹
      </button>

      <time className="week-nav-label" dateTime={isoDate} aria-live="polite">
        {monthYear}
      </time>

      <button
        type="button"
        className="week-nav-button"
        aria-label="Go to next week"
        onClick={() => changeWeek(1)}
      >
        ›
      </button>
    </nav>
  );
};

export default WeekNavigation;
