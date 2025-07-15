//Filename: WeekDayColumn.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
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
    // Generate hours from 9 AM to 9 PM (12 hours total).
    const hours = Array.from({ length: 13 }, (_, i) => i + 9);

  return (
    <section className="weekday-column" aria-label={`Schedule for ${day.toDateString()}`}>
      <header className="weekday-header">
        <h3 className="weekday-label">{day.toDateString()}</h3>
      </header>

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
    </section>
  );
};

export default WeekDayColumn;
