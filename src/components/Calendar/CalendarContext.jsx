//Filename: CalendarContext.jsx
//Author: Kyle McColgan
//Date: 17 April 2026
//Description: This file contains the Calendar context component for the Saint Louis events calendar React project.

import React, { createContext, useContext, useState } from 'react';

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

const getStartOfWeekUTC = (date) => {
  const d = new Date(date);

  //Get Chicago date parts.
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const parts = formatter.formatToParts(d);
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

  const dayMap = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3,
    Thu: 4, Fri: 5, Sat: 6,
  };

  const diff = dayMap[map.weekday];

  //Step #1: Chicago-local date string.
  const chicagoDateStr = `${map.year}-${map.month}-${map.day}`;

  //Step #2: Move back to Sunday in pure date math.
  const temp = new Date(`${chicagoDateStr}T00:00:00`);
  temp.setDate(temp.getDate() - diff);

  const sundayStr = temp.toISOString().slice(0, 10);

  //Step #3: Construct exact Chicago midnight -> interpreted in Chicago time -> converted to UTC.
  const chicagoMidnightUTC = new Date(
    `${sundayStr}T00:00:00-05:00` //Fallback offset, corrected below.
  );

  //Step #4: Correct DST dynamically using Intl for GitHub Actions.
  const chicagoTime = new Date(
    chicagoMidnightUTC.toLocaleString("en-US", { timeZone: "America/Chicago" })
  );

  const offsetMinutes =
    chicagoMidnightUTC.getTime() - chicagoTime.getTime();

  return new Date(chicagoMidnightUTC.getTime() + offsetMinutes);
};

export const CalendarProvider = ({ children, initialDate }) => {
  const [currentDate, setCurrentDate] = useState(initialDate ?? getStartOfWeekUTC(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(getStartOfWeekUTC(newDate));
  };

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(getStartOfWeekUTC(newDate));
  };

  const selectDate = (date) => {
    const parsedDate = new Date(date);
    if ( (parsedDate instanceof Date) && (!Number.isNaN(parsedDate.getTime())))
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
