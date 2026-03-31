//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 30 March 2026
//Description: This file contains the week navigation functionality for the Saint Louis Events project.

import React, { useMemo } from "react";
import { useCalendarContext } from "../Calendar/CalendarContext.jsx";
import "./WeekNavigation.css";

const WeekNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  const { monthYear, isoDate } = useMemo(() => {
    return {
      monthYear: currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC", //Explicitly force UTC.
      }),
      isoDate: currentDate.toISOString().split("T")[0],
    }
  }, [currentDate]);

  return (
    <nav className="week-navigation" aria-label="Calendar week navigation">
      <button
        type="button"
        className="week-nav-button"
        aria-label="Previous week"
        onClick={() => changeWeek(-1)}
      >
        <span aria-hidden="true">‹</span>
      </button>

      <time className="week-nav-label" dateTime={isoDate} aria-live="polite">
        {monthYear}
      </time>

      <button
        type="button"
        className="week-nav-button"
        aria-label="Next week"
        onClick={() => changeWeek(1)}
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  );
};

export default WeekNavigation;
