// Calendar.jsx
import React from 'react';
import './Base.css';
import './Calendar.css';
import { useCalendarContext } from './CalendarContext';
import DaysOfWeek from './DaysOfWeek';
import events from '../../data/events.json';
import EventPanel from './EventPanel';
import useDayClick from './useDayClick';
import MonthNavigation from './MonthNavigation';

const Calendar = () => {
  const { currentDate, changeMonth } = useCalendarContext();
  const { showEventPanel, handleDayClick, closeEventPanel } = useDayClick(currentDate);
  
   // Hours for the time slots (9 AM to 1 AM)
	const hours = Array.from({ length: 16 }, (_, i) => i + 6); // 9 AM to 1 AM

  // Generate an array of days for the current week
  const getWeekDays = (date) => {
    const days = [];
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Start on Sunday.

    for (let i = 0; i < 7; i++)
	{
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const weekDays = getWeekDays(currentDate);

  // Week navigation logic
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7); // Shift by 7 days
    changeMonth(newDate);
  };
  
   // Helper function to parse event time
	const parseEventTime = (timeString) => {
	  if (!timeString || typeof timeString !== 'string') {
		// Return a default range if the time string is missing, undefined, or invalid
		return { startHour: 0, endHour: 0 };
	  }

	  // Handle "All Day" case
	  if (timeString === 'All Day')
	  {
		return { startHour: 9, endHour: 21 }; // Assuming you want to show all-day events from 9 AM to 9 PM
	  }

	  const [start, end] = timeString.split(' - ').map((t) => t?.trim());

	  const parseTime = (time) => {
		if (!time) return 0; // Default to 0 if the time is undefined
		const [hour, minPart] = time.split(':');
		const [minutes, period] = minPart.split(' '); 
		let hourInt = parseInt(hour, 10);
		if (period === 'PM' && hourInt !== 12) hourInt += 12;
		if (period === 'AM' && hourInt === 12) hourInt = 0;
		return hourInt;
	  };

	  return {
		startHour: parseTime(start),
		endHour: end ? parseTime(end) : parseTime(start) + 1, // Default duration is 1 hour
	  };
	};

  // Get events for a specific day and hour
	const getEventsForTimeSlot = (day, hour) => {
	  return events.filter((event) => {
		const eventDate = new Date(event.date);
		if (eventDate.toDateString() !== day.toDateString()) return false;

		const { startHour, endHour } = parseEventTime(event.time || "");

		// Adjust for events that end past midnight
		const normalizedEndHour = endHour < startHour ? endHour + 24 : endHour;
		const normalizedHour = hour < 9 ? hour + 24 : hour;

		return normalizedHour >= startHour && normalizedHour < normalizedEndHour;
	  });
	};
	
	const renderTimeLabel = (hour) => {
	  const hourIn12 = hour > 12 ? hour - 12 : hour;
	  const period = hour >= 12 ? 'PM' : 'AM';
	  return `${hourIn12} ${period}`;
	};

  return (
    <div className="calendar-container">
      <MonthNavigation
        onPrevWeek={() => navigateWeek(-1)} // Shift to the previous week
        onNextWeek={() => navigateWeek(1)} // Shift to the next week
      />

      <div className="calendar-body">
        <DaysOfWeek />

        <div className="week-view">
		  {weekDays.map((day, index) => (
			<div key={index} className="week-day">
			  <div className="day-header">
				<span>{day.toDateString()}</span>
			  </div>

			  {/* Render All Day Events */}
			  <div className="all-day-events">
				{events
				  .filter(
					(event) =>
					  new Date(event.date).toDateString() === day.toDateString() &&
					  event.time === "All Day"
				  )
				  .map((event) => (
					<div key={event.id} className="all-day-event">
					  <strong>{event.title}</strong>
					  <p>{event.description}</p>
					</div>
				  ))}
			  </div>

			  {/* Render Hourly Events */}
			  <div className="time-slots">
				{hours.map((hour) => (
				  <div key={hour} className="time-slot">
					<div className="time-label">{renderTimeLabel(hour)}</div>
					<div className="events">
					  {getEventsForTimeSlot(day, hour).map((event) => (
						<div key={event.id} className="event-card">
						  {event.title}
						</div>
					  ))}
					</div>
				  </div>
				))}
			  </div>
			</div>
		  ))}
		</div>

        {showEventPanel && (
          <EventPanel
            selectedDate={currentDate}
            events={events}
            onClose={closeEventPanel}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
