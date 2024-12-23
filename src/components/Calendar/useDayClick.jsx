import { useState } from 'react';

const useDayClick = (currentDate, selectDate) => {
  const [showEventPanel, setShowEventPanel] = useState(false);

  const handleDayClick = (day) => {
    if (day > 0 && day <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()) {
      const selected = new Date(currentDate);
      selected.setDate(day);
      selectDate(selected);
      setShowEventPanel(true);
    } else {
      console.error('Invalid selected date:', day);
    }
  };

  const closeEventPanel = () => setShowEventPanel(false);

  return { showEventPanel, handleDayClick, closeEventPanel };
};

export default useDayClick;
