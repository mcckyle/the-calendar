//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 2 March 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React, { useState, useEffect, useMemo } from "react";
import { convertTo12HourFormat, groupEventsByHour } from "../../utils/eventUtils";
import { useCalendarContext } from "./CalendarContext";
import { useEvents } from "../../hooks/useEvents";

import WeekNavigation from "../WeekNavigation/WeekNavigation.jsx";
import DaysOfWeek from "../DaysOfWeek/DaysOfWeek.jsx";
import WeekDayColumn from "../WeekDayColumn/WeekDayColumn.jsx";
import EventPanel from "../EventPanel/EventPanel.jsx";

import "./Calendar.css";

const Calendar = () => {
  const { currentDate } = useCalendarContext();
  const [weekDays, setWeekDays] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const apiUrl = "https://calendar-backend-xxa6.onrender.com";

  //Compute the start + end of the current week from the CalendarContext.
  const weekStart = useMemo(
    () => currentDate.toISOString().split("T")[0],
    [currentDate]
  );
  const weekEnd = useMemo(() => {
    const end = new Date(currentDate);
    end.setDate(end.getDate() + 6);
    return end.toISOString().split("T")[0];
  }, [currentDate]);

  //Fetch the events...
  const { events = [], loading, error } = useEvents(apiUrl, weekStart, weekEnd);

  //Generate week days based on the CalendarContext.
  useEffect(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(currentDate);
      day.setUTCDate(currentDate.getUTCDate() + i);
      return day;
    });
    setWeekDays(days);
  }, [currentDate]);

  return (
    <section
      className="calendar"
      aria-label="Weekly events calendar"
      aria-busy={loading}
    >
      <header className="calendar-header">
        <WeekNavigation />
      </header>

      {loading && (
        <div className="calendar-feedback" role="status" aria-live="polite">
          Loading events…
        </div>
      )}

      {error && (
        <div className="calendar-feedback error" role="alert">
          {error}
        </div>
      )}

      {(! loading) && ( ! error) && (
        <div className="calendar-grid">
          <DaysOfWeek weekDays={weekDays} />

          <div className="week-view">
            {weekDays.map((day) => (
              <WeekDayColumn
                key={day.toDateString()}
                day={day}
                groupedEvents={groupEventsByHour(day, events)}
                onEventClick={setSelectedEvent}
                convertTo12HourFormat={convertTo12HourFormat}
              />
            ))}
          </div>
        </div>
      )}

      {/* Conditionally render the EventPanel. */}
      {selectedEvent && (
        <EventPanel
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
};

export default Calendar;
