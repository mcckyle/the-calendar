//Filename: CalendarContext.jsx
//Author: Kyle McColgan
//Date: 12 November 2026
//Description: This file contains the Calendar context component for the Saint Louis Events React project.

import React, { createContext, useContext, useState } from 'react';

const CHICAGO_TIME_ZONE = "America/Chicago";
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const WEEKDAY_INDEX = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const CHICAGO_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: CHICAGO_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});
const CHICAGO_WALL_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: CHICAGO_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const isValidDate = (date) =>
  date instanceof Date && Number.isFinite(date.getTime());

const getChicagoParts = (date) => {
  const parts = CHICAGO_DATE_FORMATTER.formatToParts(date);

  return Object.fromEntries(parts.map(({ type, value }) => [type, value]));
};

//Construct a UTC timestamp without Date.UTC's special handling of years 0-99.
const createUTCDate = (year, month, day, hour = 0) => {
  const date = new Date(0);
  date.setUTCHours(hour, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
};

//Convert a Chicago wall-clock time into its corresponding UTC instant.
const chicagoWallTimeToDate = (year, month, day, hour = 0, minute = 0, second = 0) => {
  const target = createUTCDate(year, month, day, hour);
  target.setUTCMinutes(minute, second, 0);

  const targetTimestamp = target.getTime();

  if (!Number.isFinite(targetTimestamp))
  {
    return null;
  }

  let result = new Date(targetTimestamp);

  //Correct the candidate using the actual Chicago wall-clock time.
  //This accommodates CST/CDT without assuming a fixed UTC offset.
  for (let attempt = 0; attempt < 4; attempt += 1)
  {
    const parts = CHICAGO_WALL_TIME_FORMATTER.formatToParts(result);

    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    const represented = createUTCDate(
      Number(values.year),
      Number(values.month),
      Number(values.day),
      Number(values.hour)
    );

    represented.setUTCMinutes(Number(values.minute), Number(values.second), 0);

    const difference = targetTimestamp - represented.getTime();

    if (difference === 0)
    {
      break;
    }

    result = new Date(result.getTime() + difference);
  }

  //Reject nonexistent local times during the spring DST transition.
  const parts = CHICAGO_WALL_TIME_FORMATTER.formatToParts(result);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const matchesTarget =
    Number(values.year) === year &&
    Number(values.month) === month &&
    Number(values.day) === day &&
    Number(values.hour) === hour &&
    Number(values.minute) === minute &&
    Number(values.second) === second;

  return matchesTarget ? result : null;
};

const getStartOfWeekUTC = (date) => {
  if (!isValidDate(date))
  {
    return getStartOfWeekUTC(new Date());
  }

  //Get Chicago date parts.
  const parts = getChicagoParts(date);
  const weekdayIndex = WEEKDAY_INDEX[parts.weekday];

  if (weekdayIndex === undefined)
  {
    return getStartOfWeekUTC(new Date());
  }

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);

  const calendarDate = createUTCDate(year, month, day);
  calendarDate.setUTCDate(calendarDate.getUTCDate() - weekdayIndex);

  return chicagoWallTimeToDate(calendarDate.getUTCFullYear(), calendarDate.getUTCMonth() + 1, calendarDate.getUTCDate());
};

//Represent a Chicago calendar date independently of its UTC offset.
const getCalendarDateAnchor = (date) => {
  if (!isValidDate(date))
  {
    return null;
  }

  const parts = getChicagoParts(date);

  //Noon UTC keeps the intended Chicago calendar date unambigous.
  return createUTCDate(
    Number(parts.year),
    Number(parts.month),
    Number(parts.day),
    12
  );
};

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children, initialDate }) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return isValidDate(initialDate)
      ? new Date(initialDate.getTime())
      : getStartOfWeekUTC(new Date());
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (offset) => {
    if (!Number.isFinite(offset))
    {
      return;
    }

    const newDate = getCalendarDateAnchor(currentDate);
    if (!newDate)
    {
      return;
    }

    newDate.setUTCMonth(newDate.getUTCMonth() + Math.trunc(offset));
    setCurrentDate(getStartOfWeekUTC(newDate));
  };

  const changeWeek = (offset) => {
    if (!Number.isFinite(offset))
    {
      return;
    }
    const newDate = getCalendarDateAnchor(currentDate);
    newDate.setUTCDate(newDate.getUTCDate() + Math.trunc(offset) * 7);
    setCurrentDate(getStartOfWeekUTC(newDate));
  };

  const selectDate = (date) => {
    if ((date === null) || (date === undefined) || (date === ""))
    {
      return;
    }
    const parsedDate = new Date(date);
    if (isValidDate(parsedDate))
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
