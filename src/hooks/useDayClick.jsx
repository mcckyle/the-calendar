// useDayClick.jsx
import { useState } from 'react';

const useDayClick = (currentDate) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [showEventPanel, setShowEventPanel] = useState(false);

  const handleDayClick = (day) => {
    console.log("handleDayClick called with:", day.toDateString());
    setSelectedDay(day);
    setShowEventPanel(true); // This triggers the EventPanel to show
  };

  const closeEventPanel = () => {
    setShowEventPanel(false);
  };

  return { selectedDay, showEventPanel, handleDayClick, closeEventPanel };
};

export default useDayClick;
