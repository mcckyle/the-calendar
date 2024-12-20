// CalendarContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const CalendarContext = createContext();

// Custom hook to use the Calendar context
export const useCalendarContext = () => useContext(CalendarContext);

// CalendarProvider component to wrap the app and provide state
export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };

  const selectDate = (day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  return (
    <CalendarContext.Provider value={{ currentDate, selectedDate, changeMonth, selectDate }}>
      {children}
    </CalendarContext.Provider>
  );
};
