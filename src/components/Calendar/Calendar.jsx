//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 10 April 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React, { useState, useMemo, useCallback } from "react";
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
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(currentDate);
      day.setUTCDate(currentDate.getUTCDate() + index);
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

  const groupedByDay = useMemo(() => {
    return weekDays.map((day) => ({
      key: day.toISOString(),
      day,
      grouped: groupEventsByHour(day, events),
    }));
  }, [weekDays, events]);

  const handleEventClick = useCallback(setSelectedEvent, []);
  const closeEventPanel = useCallback(() => setSelectedEvent(null), []);
  const showGrid = (!loading) && (!error);

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
        <div className="calendar-feedback" role="status">
          Loading this week's events…
        </div>
      )}

      {error && (
        <div className="calendar-feedback error" role="alert">
          {error}
        </div>
      )}

      {showGrid && (
        <div className="calendar-grid">
          <DaysOfWeek weekDays={weekDays} />

          <div className="calendar-scroll-shell">
            <div
              className="week-view"
              role="list"
              aria-label="Weekly event columns"
            >
              {groupedByDay.map(({ key, day, grouped }) => (
                <WeekDayColumn
                  key={key}
                  day={day}
                  groupedEvents={grouped}
                  onEventClick={handleEventClick}
                  convertTo12HourFormat={convertTo12HourFormat}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Conditionally render the EventPanel. */}
      {selectedEvent && (
        <EventPanel selectedEvent={selectedEvent} onClose={closeEventPanel} />
      )}
    </section>
  );
};

export default Calendar;
