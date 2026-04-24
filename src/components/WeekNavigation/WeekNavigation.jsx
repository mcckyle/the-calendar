//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 23 April 2026
//Description: This file contains the week navigation functionality for the Saint Louis Events project.

import React, { useMemo, useCallback } from "react";
import { useCalendarContext } from "../Calendar/CalendarContext.jsx";
import "./WeekNavigation.css";

const WeekNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  const monthYear = useMemo(() =>
  {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC", //Explicitly force UTC.
    });
  }, [currentDate]);

  const isoDate = useMemo(() =>
  {
    return currentDate.toISOString().split("T")[0];
  }, [currentDate]);

  const handlePrev = useCallback(() => changeWeek(-1), [changeWeek]);
  const handleNext = useCallback(() => changeWeek(1), [changeWeek]);

  return (
    <nav className="week-navigation" aria-label="Calendar week navigation">
      <button
        type="button"
        className="week-nav-button"
        aria-label="Previous week"
        onClick={handlePrev}
      >
        ‹
      </button>

      <time
        className="week-nav-label"
        dateTime={isoDate}
        aria-live="polite"
        aria-atomic="true"
      >
        {monthYear}
      </time>

      <button
        type="button"
        className="week-nav-button"
        aria-label="Next week"
        onClick={handleNext}
      >
        ›
      </button>
    </nav>
  );
};

export default WeekNavigation;
