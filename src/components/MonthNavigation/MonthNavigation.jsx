//Filename: MonthNavigation.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains the MonthNavigation.jsx component for the local Saint Louis React calendar project.

import React from 'react';
import { useCalendarContext } from '../Calendar/CalendarContext.jsx';
import './MonthNavigation.css';

const MonthNavigation = () => {
  const { currentDate, changeWeek } = useCalendarContext();

  return (
    <nav className="month-navigation" aria-label="Month navigation">
      <button
        className="nav-button prev-button"
        aria-label="Previous week"
        onClick={() => changeWeek(-1)}>
          ←
      </button>
      <div className="month-year" aria-live="polite">
        <span className="month">{currentDate.toLocaleDateString('en-US', { month: 'long' })}</span>
        <span className="year">{currentDate.toLocaleDateString('en-US', { year: 'numeric' })}</span>
      </div>
      <button
        className="nav-button next-button"
        aria-label="Next week"
        onClick={() => changeWeek(1)}>
          →
      </button>
    </nav>
  );
};

export default MonthNavigation;
