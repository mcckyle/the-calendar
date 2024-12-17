import React from 'react';
import { getFirstDayOfMonth, getTotalDaysInMonth } from '../../utils/dateHelpers';
import Day from './Day';

const Days = ({ currentDate, selectedDate, onDayClick, events }) => {
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const totalDays = getTotalDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const daysArray = [];

  for (let i = 0; i < firstDay; i++) {
    daysArray.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
  }

  for (let day = 1; day <= totalDays; day++) {
    daysArray.push(
      <Day
        key={day}
        day={day}
        selectedDate={selectedDate}
        currentDate={currentDate}
        onClick={onDayClick}
        events={events}
      />
    );
  }

  return <div className="calendar-days">{daysArray}</div>;
};

export default Days;
