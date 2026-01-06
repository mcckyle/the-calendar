//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 5 January 2026
//Description: This file contains the parent component for the Saint Louis calendar project.

import React, { useState, useEffect } from "react";
import { useCalendarContext } from "./CalendarContext";
import { useEvents } from "../../hooks/useEvents";

import DaysOfWeek from "../DaysOfWeek/DaysOfWeek.jsx";
import WeekNavigation from "../WeekNavigation/WeekNavigation.jsx";
import WeekDayColumn from "../WeekDayColumn/WeekDayColumn.jsx";
import EventPanel from "../EventPanel/EventPanel.jsx";

import {
  convertTo12HourFormat,
  groupEventsByHour,
} from "../../utils/eventUtils";

import './Calendar.css';

const Calendar = () => {
  const { currentDate } = useCalendarContext();

  const [weekDays, setWeekDays] = useState([]);
  const [normalizedEvents, setNormalizedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const apiUrl = "https://calendar-backend-xxa6.onrender.com";

  //Compute the start + end of the current week from CalendarContext.jsx.
  const weekStart = currentDate.toISOString().split("T")[0];
  const weekEnd = new Date(currentDate);
  weekEnd.setDate(currentDate.getDate() + 6); // Sunday + 6 == Saturday.
  const weekEndISO = weekEnd.toISOString().split("T")[0];

  //Fetch the events...
  const { events, loading, error } = useEvents(apiUrl, weekStart, weekEndISO);

  //Normalize the events...
  useEffect(() => {
    setNormalizedEvents(events?.length ? events : []);
  }, [events]);

  //Generate the seven days of the week based on CalendarContext.jsx.
  useEffect(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + i);
      return day;
    });

    setWeekDays(days);
    console.log("Week Dates:", days); // Log to verify correct week days.
  }, [currentDate]);

  const handleEventClick = (event) => setSelectedEvent(event);
  const closeEventPanel = () => setSelectedEvent(null);

  return (
    <section className="calendar" aria-label="Weekly Event Calendar">
      <header className="calendar-header">
        <WeekNavigation />
      </header>

      <main className="calendar-main">
        {loading && <p className="calendar-status" role="status">Loading events...</p>}
        {error && <p className="calendar-status error" role="alert">{error}</p>}

        <div className="calendar-body">
          <div className="calendar-grid">
            <DaysOfWeek weekDays={weekDays} />

            <section className="week-view" aria-label="Week view">
              {weekDays.map((day) => (
                <WeekDayColumn
                  key={day.toDateString()}
                  day={day}
                  groupedEvents={groupEventsByHour(day, normalizedEvents)}
                  onEventClick={handleEventClick}
                  convertTo12HourFormat={convertTo12HourFormat}
                />
              ))}
            </section>
          </div>
        </div>
      </main>

      {/* Conditionally render the EventPanel. */}
      {selectedEvent && (
        <EventPanel selectedEvent={selectedEvent} onClose={closeEventPanel} />
      )}
    </section>
  );
};

export default Calendar;
