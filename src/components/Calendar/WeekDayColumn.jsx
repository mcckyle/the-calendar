import React from 'react';
import TimeSlot from './TimeSlot';

const WeekDayColumn = ({ day, events = [], hours = [], getEventsForTimeSlot, onDayClick, renderTimeLabel, onEventClick }) => {
  const allDayEvents = events.filter(
    (event) =>
      new Date(event.date).toDateString() === day.toDateString() &&
      event.time === "All Day"
  );
  
  // Determine if an event spans multiple hours
  const isMultiHourEvent = (event) => event.startTime && event.endTime;
  
  // Filter multi-hour events
  const multiHourEvents = events.filter(
    (event) =>
      new Date(event.date).toDateString() === day.toDateString() &&
      event.startTime &&
      event.endTime
  );
  
  // Group events by hour
  const eventsByHour = hours.map((hour) =>
    getEventsForTimeSlot(day, hour).filter((event) => !isMultiHourEvent(event))
  );


	return (
	  <div className="week-day-column">
		{/* Day Header */}
		<div className="day-header">
		  <span>{day.toDateString()}</span>
		</div>

		{/* All-Day Events */}
		<div className="all-day-events">
		  {allDayEvents.map((event) => (
			<div
			  key={event.id}
			  className="all-day-event"
			  onClick={() => onEventClick(event)}
			>
			  <strong>{event.title}</strong>
			</div>
		  ))}
		</div>

		{/* Hourly Time Slots */}
		<div className="time-slots">
		  {hours.map((hour) => (
			<TimeSlot
			  key={hour}
			  hour={hour}
			  label={renderTimeLabel(hour)}
			  events={getEventsForTimeSlot(day, hour).filter(
				(event) => !event.startTime || !event.endTime
			  )} // Exclude multi-hour events
			  onEventClick={onEventClick}
			/>
		  ))}

		  {/* Multi-Hour Events */}
		  {multiHourEvents.map((event) => {
			const startIndex = hours.indexOf(event.startTime);
			const endIndex = hours.indexOf(event.endTime);
			const slotHeight = endIndex - startIndex + 1;

			return (
			  <div
				key={event.id}
				className="multi-hour-event"
				style={{
				  gridRow: `${startIndex + 1} / span ${slotHeight}`,
				}}
				onClick={() => onEventClick(event)}
			  >
				<strong>{event.title}</strong>
			  </div>
			);
		  })}
		</div>
	  </div>
	);
};

export default WeekDayColumn;