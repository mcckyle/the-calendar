//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 12 September 2025
//Description: This file contains the row of date labels for the Saint Louis React calendar project.

import React from 'react';
import './DaysOfWeek.css';

const DaysOfWeek = ({ weekDays = [] }) => {
  return (
    <div className="days-of-week-container" role="row">
      {weekDays.map((day, index) => {
        const isToday = day.toDateString() === new Date().toDateString();

        return (
            <div
              key={index}
              className={`days-of-week-item ${isToday ? "today" : ""}`}
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
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
