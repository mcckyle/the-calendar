//Filename: CalendarContext.jsx
//Author: Kyle McColgan
//Date: 5 October 2025
//Description: This file contains the Calendar context component for the Saint Louis React calendar project.

import React, { createContext, useContext, useState } from 'react';

export const CalendarContext = createContext();
export const useCalendarContext = () => useContext(CalendarContext);

const getStartOfWeek = (date) => {
  const newDate = new Date(date);
  const day = newDate.getUTCDay(); //Sunday == 0, Monday == 1, etc.
  newDate.setUTCDate(newDate.getUTCDate() - day); //Backup to Sunday.
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(getStartOfWeek(newDate));
  };

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(getStartOfWeek(newDate));
  };

  const selectDate = (date) => {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate)) {
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
