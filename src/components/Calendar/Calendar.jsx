import React from 'react';
import './Calendar.css';
import events from '../../data/events.json';
import MonthNavigation from './MonthNavigation';
import DaysOfWeek from './DaysOfWeek';
import Days from './Days';
import EventCards from './EventCards';
import useCalendarState from '../../hooks/useCalendarState';
import './Base.css';

const Calendar = () => {
  const { currentDate, selectedDate, changeMonth, selectDate } = useCalendarState();

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
