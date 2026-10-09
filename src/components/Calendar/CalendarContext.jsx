//Filename: CalendarContext.jsx
//Author: Kyle McColgan
//Date: 9 October 2026
//Description: This file contains the Calendar context component for the Saint Louis Events React project.

import React, { createContext, useContext, useState } from 'react';

const CHICAGO_TIME_ZONE = "America/Chicago";
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

const getChicagoParts = (date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(date);

  return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
};

const chicagoMidnightToDate = (year, month, day) => {
  const target = Date.UTC(year, month - 1, day);
  let result = new Date(target);

  for (let attempt = 0; attempt < 3; attempt += 1)
  {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: CHICAGO_TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(result);

    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    const represented = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second)
    );

    const difference = target - represented;

    if (difference === 0)
    {
      break;
    }

    result = new Date(result.getTime() + difference);
  }

  return result;
};

const getStartOfWeekUTC = (date) => {
  if (!(date instanceof Date) || !Number.isFinite(date.getTime()))
  {
    return getStartOfWeekUTC(new Date());
  }

  //Get Chicago date parts.
  const parts = getChicagoParts(date);
  const weekdayIndex = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3,
    Thu: 4, Fri: 5, Sat: 6,
  }[parts.weekday];

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);

  const chicagoCalendarDate = Date.UTC(year, month - 1, day);
  const sunday = new Date(chicagoCalendarDate - weekdayIndex * MILLISECONDS_PER_DAY);

  return chicagoMidnightToDate(sunday.getUTCFullYear(), sunday.getUTCMonth() + 1, sunday.getUTCDate());
};

const getCalendarDateAnchor = (date) => {
  const parts = getChicagoParts(date);

  //Noon UTC keeps the intended Chicago calendar date unambigous.
  return new Date(
    Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      12
    )
  );
};

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children, initialDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate ?? getStartOfWeekUTC(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (offset) => {
    const newDate = getCalendarDateAnchor(currentDate);
    newDate.setUTCMonth(newDate.getUTCMonth() + offset);
    setCurrentDate(getStartOfWeekUTC(newDate));
  };

  const changeWeek = (offset) => {
    const newDate = getCalendarDateAnchor(currentDate);
    newDate.setUTCDate(newDate.getUTCDate() + offset * 7);
    setCurrentDate(getStartOfWeekUTC(newDate));
  };

  const selectDate = (date) => {
    const parsedDate = new Date(date);
    if (Number.isFinite(parsedDate.getTime()))
    {
      setSelectedDate(parsedDate);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDate, // Add selectedDate to the context value.
        changeMonth,
        changeWeek,
        selectDate, // Add selectDate function.
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
