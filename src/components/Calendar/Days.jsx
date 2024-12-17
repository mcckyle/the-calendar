import React from 'react';
import './Days.css';

const Days = ({ currentDate, selectedDate, onDayClick, events }) => {
  // Calculate the number of days in the current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
    ).getDay();

    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
    <div key={`empty-${i}`} className="calendar-day empty"></div>
    ));

  // Create an array of days in the month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
    <div className="calendar-days">
        {emptyDays}
        {daysArray.map((day) => (
        <div
            key={day}
            onClick={() => onDayClick(day)}
            className={
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentDate.getMonth()
                ? 'selected-day'
                : ''
            }
        >
            {day}
        </div>
        ))}
    </div>
    );
};

export default Days;
