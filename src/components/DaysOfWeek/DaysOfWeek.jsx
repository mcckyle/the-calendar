//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 05 September 2025
//Description: This file contains the row of date labels for the Saint Louis React calendar project.

import React from 'react';
import './DaysOfWeek.css';

const DaysOfWeek = ({ weekDays = [] }) => {
  return (
    <div className="days-of-week-container" role="row">
      {weekDays.map((day, index) => (
        <div
          key={index}
          className="days-of-week-item"
          role="columnheader"
          aria-label={day.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        >
          <span className="dow-label">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
          </span>
          <span className="dow-date">
              {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
