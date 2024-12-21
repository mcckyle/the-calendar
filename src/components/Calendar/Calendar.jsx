// Calendar.jsx
import React, { useState } from 'react';
//import './Base.css';
import './Calendar.css';
import { useCalendarContext } from './CalendarContext';
import MonthNavigation from './MonthNavigation';
import DaysOfWeek from './DaysOfWeek';
import Days from './Days';
import EventCards from './EventCards';
import events from '../../data/events.json';


const Calendar = () => {
  const { currentDate, selectedDate, changeMonth, selectDate } = useCalendarContext();
  const [showEventPanel, setShowEventPanel] = useState(false);

  const handleDayClick = (day) => {
  // Ensure day is valid for the current month
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

  return (
    <div className="calendar-container">
      <MonthNavigation
        onPrevMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
        currentDate={currentDate}
      />
      <div className="calendar-body">
        <DaysOfWeek />
        <Days
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
          events={events}
        />
        {showEventPanel && (
          <div className="event-panel">
            <button onClick={closeEventPanel} className="close-button">
              Close
            </button>
            <EventCards selectedDate={selectedDate} events={events} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
