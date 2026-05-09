//Filename: CalendarContext.jsx
//Author: Kyle McColgan
//Date: 8 May 2026
//Description: This file contains the Calendar context component for the Saint Louis events calendar React project.

import React, { createContext, useContext, useState } from 'react';

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);
const CHICAGO_TIMEZONE = "America/Chicago";

const getChicagoDateParts = (date) =>
{
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = formatter.formatToParts(date);

  return Object.fromEntries(parts.map(part => [part.type, part.value]));
};

const getStartOfWeekUTC = (date) =>
{
  const parts = getChicagoDateParts(date);

  const weekdayMap = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3,
    Thu: 4, Fri: 5, Sat: 6,
  };

  const localDate = new Date(`${parts.year}-${parts.month}-${parts.day}T00:00:00`);
  localDate.setDate(localDate.getDate() - weekdayMap[parts.weekday]);

  return localDate;
};

export const CalendarProvider = ({ children, initialDate }) =>
{
  const [currentDate, setCurrentDate] = useState(initialDate ?? getStartOfWeekUTC(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (offset) =>
  {
    setCurrentDate((previous) =>
    {
      const next = new Date(previous);
      next.setMonth(previous.getMonth() + offset);
      return getStartOfWeekUTC(next);
    })
  };

  const changeWeek = (offset) =>
  {
    setCurrentDate((previous) =>
    {
      const next = new Date(previous);
      next.setDate(previous.getDate() + offset * 7);
      return getStartOfWeekUTC(next);
    })
  };

  const selectDate = (date) =>
  {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime()))
    {
      setSelectedDate(parsed);
    }
  };

  const value = {currentDate, selectedDate, changeMonth, changeWeek, selectDate };

  return (
    <CalendarContext.Provider
      value={value}
    >
      {children}
    </CalendarContext.Provider>
  );
};
