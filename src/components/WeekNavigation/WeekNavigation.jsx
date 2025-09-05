//Filename: WeekNavigation.jsx
//Author: Kyle McColgan
//Date: 04 September 2025
//Description: This file contains the week navigation functionality for the Saint Louis React calendar project.

import React from 'react';
import { useCalendarContext } from '../Calendar/CalendarContext.jsx';
import './WeekNavigation.css';

const WeekNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  const formatMonthYear = () => {
    const options = { month: 'long', year: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  return (
    <nav className="week-navigation" aria-label="Week navigation">
      <button
        className="nav-button"
        aria-label="Previous week"
        onClick={() => changeWeek(-1)}
      >
          ‹
      </button>
      <div className="month-year" aria-live="polite">
        {formatMonthYear()}
      </div>
      <button
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
