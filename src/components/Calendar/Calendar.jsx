//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 16 March 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React, { useState, useMemo } from "react";
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
  const [selectedEvent, setSelectedEvent] = useState(null);

  const apiUrl = "https://calendar-backend-xxa6.onrender.com";

  //Generate the seven days of the current week based on CalendarContext.
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(currentDate);
      day.setUTCDate(currentDate.getUTCDate() + i);
      return day;
    });
  }, [currentDate]);

  //Compute API query bounds based on CalendarContext.
  const weekStart = useMemo(
    () => currentDate.toISOString().split("T")[0],
    [currentDate]
  );
  const weekEnd = useMemo(
    () => weekDays[6].toISOString().split("T")[0],
    [weekDays]
  );

  //Fetch the weekly events...
  const { events = [], loading, error } = useEvents(apiUrl, weekStart, weekEnd);
  const showCalendar = (!loading) && (!error);

  return (
    <section
      className="calendar"
      aria-label="Weekly Saint Louis events calendar"
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

      {showCalendar && (
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
