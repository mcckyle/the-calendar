import { useState } from 'react';

const useCalendarState = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };

  const selectDate = (day) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  return { currentDate, selectedDate, changeMonth, selectDate };
};

export default useCalendarState;
