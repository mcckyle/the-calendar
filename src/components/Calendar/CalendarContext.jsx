//Filename: CalendarContext.jsx
//Author: Kyle McColgan
//Date: 15 April 2026
//Description: This file contains the Calendar context component for the Saint Louis events calendar React project.

import React, { createContext, useContext, useState } from 'react';

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

const getStartOfWeekUTC = (date) => {
  const d = new Date(date);

  //Get Chicago Y/M/D + weekday.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(d);

  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

  const dayMap = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3,
    Thu: 4, Fri: 5, Sat: 6,
  };

  const diff = dayMap[map.weekday];

  //Build Chicago-local date at midnight.
  const chicagoMidnight = new Date(
    `${map.year}-${map.month.padStart(2, "0")}-${map.day.padStart(2, "0")}T00:00:00`
  );

  //Move back to Sunday (still Chicago-local).
  chicagoMidnight.setDate(chicagoMidnight.getDate() - diff);

  //Now convert that exact Chicago midnight to UTC.
  return new Date(
    chicagoMidnight.toLocaleString("en-US", { timeZone: "UTC" })
  );
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
