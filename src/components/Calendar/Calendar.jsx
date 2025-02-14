//Filename: Calendar.jsx
//Date: 13 February 2025
//Description: Main parent component for the local calendar project.

import React, { useState, useEffect } from 'react';
import './Base.css';
import './Calendar.css';
import { useCalendarContext } from './CalendarContext';
import DaysOfWeek from './DaysOfWeek';
import events from '../../data/events.json';
import EventPanel from './EventPanel';
import MonthNavigation from './MonthNavigation';
import WeekDayColumn from './WeekDayColumn';

const Calendar = ({ hours }) => {
  //const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const { currentDate, changeWeek, selectedDate } = useCalendarContext();
  
  const [normalizedEvents, setNormalizedEvents] = useState([]);

	useEffect(() => {
	  const normalized = normalizeEvents(events);
	  console.log("Normalized Events:", normalized); //For debugging purposes...
	  setNormalizedEvents(normalized);
	}, [events]);
  
  const convertTo12HourFormat = (time) => {
	  const [hour, minute] = time.split(':').map(num => parseInt(num));
	  const isPM = hour >= 12;
	  const adjustedHour = hour % 12 || 12; // Convert hour to 12-hour format
	  const adjustedMinute = minute.toString().padStart(2, '0');
	  return `${adjustedHour}:${adjustedMinute} ${isPM ? 'PM' : 'AM'}`;
	};

	const [startOfWeek, setStartOfWeek] = useState(() => {
	  // Initialize to the current week's start date (Sunday)
	  const now = new Date();
	  const day = now.getDay();
	  const diff = now.getDate() - day; // Adjust for Sunday
	  const startOfWeekDate = new Date(now);
	  startOfWeekDate.setDate(diff); // Set the date to the Sunday of the current week
	  return startOfWeekDate;
	});
  
    // Format the month name and year for the calendar header
	const renderMonthYear = () => {
	  console.log('startOfWeek:', startOfWeek);
	  const monthOptions = { month: 'long', year: 'numeric' };
	  return startOfWeek.toLocaleString('en-US', monthOptions);
	};

  const getEventsForTimeSlot = (day, hour) => {
    return events.filter(event => event.date === day.toDateString() && event.time === hour);
  };
  
	const renderTimeLabel = (hour) => {
	  const timeString = `${hour}:00`; // Convert hour to "HH:00"
	  return convertTo12HourFormat(timeString); // Convert to 12-hour format
	};
  
	const navigateWeek = (direction) => {
	  const newStartOfWeek = new Date(startOfWeek);
	  newStartOfWeek.setDate(startOfWeek.getDate() + direction * 7);

	  // Ensure the new date is correctly set to the start of the next week
	  setStartOfWeek(newStartOfWeek);
	};

	useEffect(() => {
	  const generateWeekDays = () => {
		const weekDaysArray = Array.from({ length: 7 }, (_, i) => {
		  const day = new Date(startOfWeek); 
		  day.setDate(startOfWeek.getDate() + i);
		  return day;
		});
		setWeekDays(weekDaysArray);
		console.log("Week Dates:", weekDaysArray); // Log to verify correct week days
	  };

	  generateWeekDays();
	}, [startOfWeek]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventPanel(true); // Open the event panel
  };

  const closeEventPanel = () => {
    setShowEventPanel(false);
    setSelectedEvent(null);
  };
  
  const getWeekDates = () => {
    const weekDates = [];
    for (let i = 0; i < 7; i++)
	{
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(); // Get updated dates when startOfWeek changes
  
    // Filter events by selected day.
	const getEventsForDay = (day) => {
	  return events.filter(event => {
		// Normalize both event date and day to 'YYYY-MM-DD'
		const eventDate = new Date(event.startTime).toISOString().split('T')[0];  // Format event date to 'YYYY-MM-DD'
		const dayDate = day.toISOString().split('T')[0];  // Format day to 'YYYY-MM-DD'

		// Log both normalized dates
		console.log(`Event Date: ${eventDate}, Day Date: ${dayDate}`);

		return eventDate === dayDate; // Match event date to current day
	  });
	};
	
	// Helper function to parse 12-hour time into a Date object
	const parseEventTime = (date, time) => {
	  if (!date || !time) return null; // Ensure both date and time exist

	  const [timePart, modifier] = time.split(" "); // Split "01:00 PM" into "01:00" and "PM"
	  let [hours, minutes] = timePart ? timePart.split(":").map(Number) : [0, 0]; // Default to 00:00 if timePart is missing

	  if (modifier === "PM" && hours !== 12)
	  {
		hours += 12; // Convert PM hours to 24-hour format
	  }
	  if (modifier === "AM" && hours === 12)
	  {
		hours = 0; // Convert midnight (12 AM) to 0
	  }

	  // Create a Date object with the parsed time
	  const parsedDate = new Date(`${date}T00:00:00`); // Start with the date at midnight
	  parsedDate.setHours(hours, minutes, 0, 0); // Set the correct hours and minutes

	  return parsedDate;
	};

	const normalizeEvents = (events) =>
	  events.map((event) => {
		const date = event.date || ""; // Ensure date exists.
		const allDay = event.allDay ?? (!event.startTime && !event.endTime); // Guess based on missing time fields.

		// If it's an all-day event, no need to parse startTime or endTime.
		const startTimeDate = !allDay && event.startTime ? parseEventTime(date, event.startTime) : null;
		const endTimeDate = !allDay && event.endTime ? parseEventTime(date, event.endTime) : null;

		// Log invalid date warnings.
		if (!allDay && (!startTimeDate || isNaN(startTimeDate)))
		{
		  console.error("Invalid Date created for event:", event);
		}

		return {
		  id: event.id,
		  title: event.title || "Untitled Event",
		  date: date, // Keep the raw date string
		  startTime: startTimeDate, // Parsed to Date object if applicable
		  endTime: endTimeDate, // Parsed to Date object if applicable
		  allDay: allDay, // Explicitly mark allDay
		};
	  });
	  
	const filterEventsByDay = (day) => {
	  const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()); // Local start of the day
	  const endOfDay = new Date(startOfDay);
	  endOfDay.setDate(startOfDay.getDate() + 1); // Local end of the day

	  return normalizedEvents.filter(event => {
		return event.startTime >= startOfDay && event.startTime < endOfDay;
	  });
	};
		
	const groupEventsByHour = (day) => {
	  const eventsByHour = Array.from({ length: 24 }, () => []); // Create 24 independent arrays
	  const dayEvents = filterEventsByDay(day);

	  dayEvents.forEach((event) => {
		const hour = event.startTime.getHours(); // Extract the hour from event time (local time)
		eventsByHour[hour].push(event); // Add event to the correct hour
	  });

	  return eventsByHour;
	};
	  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateWeek(-1)}>Previous</button>
        <span>{renderMonthYear()}</span>
        <button onClick={() => navigateWeek(1)}>Next</button>
      </div>
      
      <div className="calendar-body">
        <div className="week-view">
          {weekDays.map((day) => (
            <WeekDayColumn
              key={day.toDateString()}
              day={day}
              groupedEvents={groupEventsByHour(day)}
              onEventClick={handleEventClick}
              convertTo12HourFormat={convertTo12HourFormat}
            />
          ))}
        </div>
      </div>

      {/* Conditionally render the EventPanel */}
      {showEventPanel && (
        <EventPanel
          selectedEvent={selectedEvent}
          onClose={closeEventPanel}
        />
      )}
    </div>
  );
};

export default Calendar;
