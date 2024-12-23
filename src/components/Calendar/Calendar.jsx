// Calendar.jsx
import React, { useState } from 'react';
import './Base.css';
import './Calendar.css';
import { useCalendarContext } from './CalendarContext';
import MonthNavigation from './MonthNavigation';
import DaysOfWeek from './DaysOfWeek';
import Days from './Days';
import EventCards from './EventCards';
import events from '../../data/events.json';
import EventPanel from './EventPanel';
import useDayClick from './useDayClick';


const Calendar = () => {
  const { currentDate, selectedDate, changeMonth, selectDate } = useCalendarContext();
  const { showEventPanel, handleDayClick, closeEventPanel } = useDayClick(currentDate, selectDate);

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
          <EventPanel
            selectedDate={selectedDate}
            events={events}
            onClose={closeEventPanel}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
