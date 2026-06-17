//Filename: Calendar.jsx
//Author: Kyle McColgan
//Date: 17 June 2026
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

const API_URL = "https://calendar-backend-xxa6.onrender.com";

const Calendar = () =>
{
  const { currentDate } = useCalendarContext();
  const [selectedEvent, setSelectedEvent] = useState(null);

  //Generate the seven days of the current week based on CalendarContext.
  const weekDays = useMemo(() =>
  {
    return Array.from({ length: 7 }, (_, index) =>
    {
      const day = new Date(currentDate);
      day.setUTCDate(currentDate.getUTCDate() + index);
      return day;
    });
  }, [currentDate]);

  //Compute API query bounds based on CalendarContext.
  const weekStart = currentDate.toISOString().split("T")[0];
  const weekEnd = useMemo(() =>
  {
    const end = new Date(currentDate);
    end.setUTCDate(currentDate.getUTCDate() + 6);
    return end.toISOString().split("T")[0];
  }, [currentDate]);

  //Fetch the weekly events...
  const { events = [], loading, error } = useEvents(API_URL, weekStart, weekEnd);

  //Group events by day/hour.
  const groupedByDay = useMemo(() =>
  {
    return weekDays.map((day) => ({
      key: getChicagoISODate(day),
      day,
      grouped: groupEventsByHour(day, events),
    }));
  }, [weekDays, events]);

  const handleEventClick = useCallback(setSelectedEvent, []);
  const closeEventPanel = useCallback(() => setSelectedEvent(null), []);

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
      {error && (
        <div
          className="calendar-feedback error"
          role="alert"
        >
          {error}
        </div>
      )}

      <section
        className="calendar-scroll-shell"
        role="region"
        aria-label="Weekly calendar grid"
      >
        <div className="calendar-columns">
          <DaysOfWeek weekDays={weekDays} />

          <section
            className="week-view"
            role="grid"
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
          </section>
        </div>
      </section>

      {/* Conditionally render the EventPanel. */}
      {selectedEvent && (
        <EventPanel selectedEvent={selectedEvent} onClose={closeEventPanel} />
      )}
    </section>
  );
};

export default Calendar;
