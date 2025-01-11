// CalendarContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create the Calendar Context
export const CalendarContext = createContext();

export const useCalendarContext = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(newDate);
  };

	const selectDate = (date) => {
	  const parsedDate = new Date(date);
	  if (isNaN(parsedDate)) {
		return; // Do nothing if the date is invalid
	  }
	  setSelectedDate(parsedDate);
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