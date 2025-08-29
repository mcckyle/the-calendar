//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 25 August 2025
//Description: This file contains the parent component for the Saint Louis calendar project.

import React, { useState, useEffect } from 'react';
import { useCalendarContext } from './CalendarContext';
import { useEvents } from "../../hooks/useEvents";
import DaysOfWeek from '../DaysOfWeek/DaysOfWeek.jsx';
import events from '../../data/events.json';
import EventPanel from '../EventPanel/EventPanel.jsx';
import MonthNavigation from '../MonthNavigation/MonthNavigation.jsx';
import WeekDayColumn from '../WeekDayColumn/WeekDayColumn.jsx';

import {
	convertTo12HourFormat,
	normalizeEvents,
	groupEventsByHour,
} from "../../utils/eventUtils";

import './Calendar.css';

const Calendar = ({ hours }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const { currentDate, changeWeek, selectedDate } = useCalendarContext();
  const [normalizedEvents, setNormalizedEvents] = useState([]);

  const apiUrl = "https://calendar-backend-xxa6.onrender.com";

  const [startOfWeek, setStartOfWeek] = useState(() => {
	  // Initialize to the current week's start date (Sunday).
	  const now = new Date();
	  const day = now.getDay();
	  const diff = now.getDate() - day; // Adjust for Sunday.
	  const startOfWeekDate = new Date(now);
	  startOfWeekDate.setDate(diff); // Set the date to the Sunday of the current week.
	  return startOfWeekDate;
  });

  //Compute start and end of the current week.
  const weekStart = startOfWeek.toISOString().split("T")[0];
  const weekEnd = new Date(startOfWeek);
  weekEnd.setDate(startOfWeek.getDate() + 6); // Sunday + 6 == Saturday.
  const weekEndISO = weekEnd.toISOString().split("T")[0];

  const { events, loading, error } = useEvents(apiUrl, weekStart, weekEndISO);
  
	useEffect(() => {
	  if( (events) && (events.length > 0) )
	  {
		  const normalized = normalizeEvents(events);
		  console.log("Normalized Events:", normalized); //For debugging purposes...
		  setNormalizedEvents(normalized);
	  }
	  else
	  {
		  setNormalizedEvents([]); //Clear if no events found...
	  }
	}, [events]);
  
    // Format the month name and year for the calendar header.
	const renderMonthYear = () => {
	  console.log('startOfWeek:', startOfWeek);
	  const monthOptions = { month: 'long', year: 'numeric' };
	  return startOfWeek.toLocaleString('en-US', monthOptions);
	};

  const getEventsForTimeSlot = (day, hour) => {
    return normalizedEvents.filter(event => event.date === day.toDateString() && event.time === hour);
  };
  
	const renderTimeLabel = (hour) => {
	  const timeString = `${hour}:00`; // Convert hour to "HH:00".
	  return convertTo12HourFormat(timeString); // Convert to 12-hour format.
	};
  
	const navigateWeek = (direction) => {
	  const newStartOfWeek = new Date(startOfWeek);
	  newStartOfWeek.setDate(startOfWeek.getDate() + direction * 7);

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
		console.log("Week Dates:", weekDaysArray); // Log to verify correct week days.
	  };

	  generateWeekDays();
	}, [startOfWeek]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventPanel(true); // Open the event panel.
  };

  const closeEventPanel = () => {
    setShowEventPanel(false);
    setSelectedEvent(null);
  };
  
    // Filter events by selected day.
	const getEventsForDay = (day) => {
	  return normalizedEvents.filter(event => {
		// Normalize both event date and day to 'YYYY-MM-DD'.
		const eventDate = new Date(event.startTime).toISOString().split('T')[0];  // Format event date to 'YYYY-MM-DD'.
		const dayDate = day.toISOString().split('T')[0];  // Format day to 'YYYY-MM-DD'.

		// Log both normalized dates.
		console.log(`Event Date: ${eventDate}, Day Date: ${dayDate}`);

		return eventDate === dayDate; // Match event date to current day.
	  });
	};

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => navigateWeek(-1)}>Previous</button>
        <span>{renderMonthYear()}</span>
        <button onClick={() => navigateWeek(1)}>Next</button>
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      <div className="calendar-body">
        <div className="week-view">
          {weekDays.map((day) => (
            <WeekDayColumn
              key={day.toDateString()}
              day={day}
              groupedEvents={groupEventsByHour(day, normalizedEvents)}
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
