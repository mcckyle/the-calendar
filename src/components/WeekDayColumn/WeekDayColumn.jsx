//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 13 July 2025
//Description: This file contains the WeekDayColumn component for the local Saint Louis React calendar project.

import React from 'react';
import TimeSlot from '../TimeSlot/TimeSlot.jsx';
import './WeekDayColumn.css';

const WeekDayColumn = ({
  day,
  groupedEvents,
  onEventClick,
  convertTo12HourFormat
}) => {
	// Generate hours from 9 AM to 9 PM (12 hours total)
	const hours = Array.from({ length: 13 }, (_, i) => i + 9);

  return (
    <div className="week-day-column">
      <div className="day-header">
        <span>{day.toDateString()}</span>
      </div>

      <div className="time-slots">
        {hours.map((hour) => (
          <TimeSlot
            key={hour}
            hour={hour}
            label={convertTo12HourFormat(`${hour}:00`)} // Convert hour to preferred 12-hour format.
            events={groupedEvents[hour] || []} // Events for this hour, default to empty array.
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekDayColumn;