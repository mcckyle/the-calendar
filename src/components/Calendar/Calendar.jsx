// Calendar.jsx
import React from 'react';
import './Base.css';
import './Calendar.css';
import { useCalendarContext } from './CalendarContext';
import MonthNavigation from './MonthNavigation';
import DaysOfWeek from './DaysOfWeek';
import Days from './Days';
import EventCards from './EventCards';
import events from '../../data/events.json';


const Calendar = () => {
  const { currentDate, selectedDate, changeMonth, selectDate } = useCalendarContext();

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
          onDayClick={selectDate}
          events={events}
        />
        <EventCards selectedDate={selectedDate} events={events} />
      </div>
    </div>
  );
};

export default Calendar;
