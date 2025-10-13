//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 11 October 2025
//Description: This file contains the row of date labels for the Saint Louis React calendar project.

import React from 'react';
import './DaysOfWeek.css';

const DaysOfWeek = ({ weekDays = [] }) => {
  return (
    <div className="days-of-week" role="row">
      {weekDays.map((day, index) => {
        const isToday = day.toDateString() === new Date().toDateString();

        const weekdayLabel = day.toLocaleDateString('en-US', { weekday: 'short' });

        const dateLabel = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return (
          <div
            key={index}
            className={`day-item ${isToday ? 'today' : ''}`}
            role="columnheader"
            aria-label={`${weekdayLabel}, ${dateLabel}`}
          >
            <span className="day-label">{weekdayLabel}</span>
            <span className="day-date">{dateLabel}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DaysOfWeek;
