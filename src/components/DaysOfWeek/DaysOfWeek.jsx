//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains the DaysOfWeek.jsx component for the local Saint Louis React calendar project.

import React from 'react';
import './DaysOfWeek.css';

const DaysOfWeek = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <div className="days-of-week-container" role="row">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className="days-of-week-item"
          role="columnheader"
          aria-label={`Day of week: ${day}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default DaysOfWeek;
