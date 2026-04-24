//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 23 April 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React, { useState, useMemo, useCallback } from "react";
import { convertTo12HourFormat, groupEventsByHour } from "../../utils/eventUtils";
import { getChicagoISODate } from "../../utils/dateHelpers";
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
    return Array.from({ length: 7 }, (_, index) =>
    {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + index);

      //Keep the progression in local calendar-day increments...
      //rather than UTC timestamp increments.
      return day;
    });
  }, [currentDate]);

  //Compute API query bounds based on CalendarContext.
  const weekStart = useMemo(() => {
    return currentDate.toISOString().split("T")[0];
  }, [currentDate]);

  const weekEnd = useMemo(() => {
    const end = new Date(currentDate);
    end.setUTCDate(currentDate.getUTCDate() + 6);
    return end.toISOString().split("T")[0];
  }, [currentDate]);

  //Fetch the weekly events...
  const { events = [], loading, error } = useEvents(apiUrl, weekStart, weekEnd);

  //Group events by day/hour.
  const groupedByDay = useMemo(() => {
    return weekDays.map((day) => ({
      key: getChicagoISODate(day),
      day,
      grouped: groupEventsByHour(day, events),
    }));
  }, [weekDays, events]);

  const handleEventClick = useCallback(setSelectedEvent, []);
  const closeEventPanel = useCallback(() => setSelectedEvent(null), []);
  const isReady = (!loading) && (!error);

  return (
    <section
      className="calendar"
      aria-label="Weekly Saint Louis events calendar"
      aria-busy={loading}
    >
      <header className="calendar-header">
        <WeekNavigation />
      </header>

      {/* Stable feedback layer (prevents layout jumps). */}
      {!isReady && (
        <div
          className={`calendar-feedback ${error ? "error" : ""}`}
          role={error ? "alert" : "status"}
        >
          {error || "Loading this week's events…"}
        </div>
      )}

      <div className={`calendar-grid ${isReady ? "is-visible" : "is-hidden"}`}>
        <div className="calendar-scroll-shell">
          <div className="calendar-days-row">
            <DaysOfWeek weekDays={weekDays} />
          </div>

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

      {/* Conditionally render the EventPanel. */}
      {selectedEvent && (
        <EventPanel selectedEvent={selectedEvent} onClose={closeEventPanel} />
      )}
    </section>
  );
};

export default Calendar;
