// MonthNavigation.jsx
import React from 'react';
import './MonthNavigation.css';

const MonthNavigation = ({ onPrevMonth, onNextMonth, currentDate }) => {
  return (
    <div className="calendar-header">
      <button onClick={onPrevMonth}>&lt;</button>
      <h2>
        {currentDate.toLocaleString('default', { month: 'long' })}{' '}
        {currentDate.getFullYear()}
      </h2>
      <button onClick={onNextMonth}>&gt;</button>
    </div>
  );
};

export default MonthNavigation;
