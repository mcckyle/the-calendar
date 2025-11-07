//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 06 November 2025
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
    if ( (events) && (events.length > 0) )
    {
      //const normalized = normalizeEvents(events);
      console.log("Normalized Events from hook:", events); //For debugging purposes...
      setNormalizedEvents(events);
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
    <section className="calendar" aria-label="Weekly Event Calendar">
      <header className="calendar-header">
        <WeekNavigation />
      </header>

      <div className="calendar-main">
        {loading && <p className="calendar-status">Loading events...</p>}
        {error && <p className="calendar-status error">Error: {error}</p>}

        <div className="calendar-body">
          <div className="calendar-grid">
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
        </div>
      </div>

      {/* Conditionally render the EventPanel */}
      {showEventPanel && (
        <EventPanel selectedEvent={selectedEvent} onClose={closeEventPanel} />
      )}
    </section>
  );
};

export default Calendar;
