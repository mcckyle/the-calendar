// CalendarContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the Calendar Context
const CalendarContext = createContext();

export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (offset) => {
    // Create a new date based on the current date
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset); // Adjust the month by the offset
    setCurrentDate(newDate);
  };

  const changeWeek = (offset) => {
    // Create a new date based on the current date
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7); // Adjust by weeks
    setCurrentDate(newDate);
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        changeMonth,
        changeWeek,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};