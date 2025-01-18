import React from 'react';
import TimeSlot from './TimeSlot';
import './WeekDayColumn.css';

const WeekDayColumn = ({
  day,
  groupedEvents,
  onEventClick,
  convertTo12HourFormat
}) => {
	// Generate hours from 8 AM to 1 AM (17 hours total)
	const hours = Array.from({ length: 17 }, (_, i) => (i + 8) % 24);

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