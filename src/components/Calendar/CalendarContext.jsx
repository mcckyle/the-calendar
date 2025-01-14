// CalendarContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the Calendar Context
export const CalendarContext = createContext();

export const useCalendarContext = () => useContext(CalendarContext);

const getStartOfWeek = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday (start on Monday)
  return new Date(newDate.setDate(diff));
};

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(getStartOfWeek(new Date()));
  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state

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
        selectedDate, // Add selectedDate to the context value
        changeMonth,
        changeWeek,
        selectDate, // Add selectDate function
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};