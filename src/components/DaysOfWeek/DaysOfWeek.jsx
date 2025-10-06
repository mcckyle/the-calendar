//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 4 October 2025
//Description: This file contains the row of date labels for the Saint Louis React calendar project.

import React from 'react';
import './DaysOfWeek.css';

const DaysOfWeek = ({ weekDays = [] }) => {
  return (
    <div className="days-of-week" role="row">
      {weekDays.map((day, index) => {
        const isToday = day.toDateString() === new Date().toDateString();

        return (
          <div
            key={index}
            className={`day-item ${isToday ? 'today' : ''}`}
            role="columnheader"
            aria-label={day.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          >
            <span className="day-label">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <span className="day-date">
              {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
