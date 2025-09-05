//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 04 September 2025
//Description: This file contains the parent component for the Saint Louis calendar project.

import React, { useState, useEffect } from 'react';
import { useCalendarContext } from './CalendarContext';
import { useEvents } from "../../hooks/useEvents";
import DaysOfWeek from "../DaysOfWeek/DaysOfWeek.jsx";
import events from '../../data/events.json';
import EventPanel from '../EventPanel/EventPanel.jsx';
import WeekNavigation from '../WeekNavigation/WeekNavigation.jsx';
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
  const { currentDate } = useCalendarContext();
  const [normalizedEvents, setNormalizedEvents] = useState([]);

  const apiUrl = "https://calendar-backend-xxa6.onrender.com";

  //Compute the start + end of the current week from CalendarContext.jsx.
  const weekStart = currentDate.toISOString().split("T")[0];
  const weekEnd = new Date(currentDate);
  weekEnd.setDate(currentDate.getDate() + 6); // Sunday + 6 == Saturday.
  const weekEndISO = weekEnd.toISOString().split("T")[0];

  //Fetch the events...
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

  //Generate the seven days of the week based on CalendarContext.jsx.
  useEffect(() => {
    const generateWeekDays = () => {
      const weekDaysArray = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() + i);
        return day;
      });
      setWeekDays(weekDaysArray);
      console.log("Week Dates:", weekDaysArray); // Log to verify correct week days.
    };

    generateWeekDays();
  }, [currentDate]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventPanel(true); // Open the event panel.
  };

  const closeEventPanel = () => {
    setShowEventPanel(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <WeekNavigation />
      </div>

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      
      <div className="calendar-body">
        <DaysOfWeek weekDays={weekDays} />
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
