// MonthNavigation.jsx
import React from 'react';
import { useCalendarContext } from './CalendarContext';
import './MonthNavigation.css';

const MonthNavigation = () => {
  const { currentDate, changeMonth } = useCalendarContext();

  return (
    <div className="month-navigation">
      <button onClick={() => changeMonth(-1)}>Previous</button>
      <span>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
      <button onClick={() => changeMonth(1)}>Next</button>
    </div>
  );
};

export default MonthNavigation;
