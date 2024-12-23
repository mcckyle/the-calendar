// MonthNavigation.jsx
import React from 'react';
import { useCalendarContext } from './CalendarContext';
import './MonthNavigation.css';

const MonthNavigation = () => {
  const { currentDate, changeMonth } = useCalendarContext();

  return (
    <div className="month-navigation">
      <button className="nav-button prev-button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
        &lt;
      </button>
      <div className="month-year">
        <span className="month">{currentDate.toLocaleDateString('en-US', { month: 'long' })}</span>
        <span className="year">{currentDate.toLocaleDateString('en-US', { year: 'numeric' })}</span>
      </div>
      <button className="nav-button next-button" aria-label="Next month" onClick={() => changeMonth(1)}>
        &gt;
      </button>
    </div>
  );
};

export default MonthNavigation;
