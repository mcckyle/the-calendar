import React, { useState } from 'react';
import './Calendar.css';
import events from '../../data/events.json'; // Import the event data
import EventCard from './EventCard';

import { getFirstDayOfMonth, getTotalDaysInMonth, formatToISODate } from '../../utils/dateHelpers';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Add a state to store events for the selected day
  const [dayEvents, setDayEvents] = useState([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get the first day of the current month
//   const getFirstDayOfMonth = () => {
//     return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
//   };
//
//   // Get the total number of days in the current month
//   const getTotalDaysInMonth = () => {
//     return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
//   };

  // Handle month navigation
  const handleMonthChange = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };

  // Handle day selection
  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
  };

  // Render days of the current month
  const renderDays = () => {
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
    const totalDays = getTotalDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const daysArray = [];

    // Fill in empty spaces before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div className="calendar-day empty" key={`empty-${i}`}></div>);
    }

    // Render the actual days of the month
    for (let day = 1; day <= totalDays; day++) {
      const fullDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      ).toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

      const event = events.find((e) => e.date === fullDate);

      daysArray.push(
        <div
          className={`calendar-day ${selectedDate?.getDate() === day ? 'selected' : ''}`}
          key={day}
          onClick={() => handleDayClick(day)}
        >
          {day}
          {event && <div className="calendar-event">{event.title}</div>}
        </div>
      );
    }

    return daysArray;
  };

  return (
  <div className="calendar-container">
    <div className="calendar-header">
      <button onClick={() => handleMonthChange(-1)}>&lt;</button>
      <h2>
        {currentDate.toLocaleString('default', { month: 'long' })}{' '}
        {currentDate.getFullYear()}
      </h2>
      <button onClick={() => handleMonthChange(1)}>&gt;</button>
    </div>
    <div className="calendar-body">
      <div className="calendar-days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-day-of-week">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-days">{renderDays()}</div>
      {selectedDate && (
        <div className="event-card-container">
          {/* Render event cards for the selected date */}
          {events
            .filter((event) => event.date === selectedDate.toISOString().split('T')[0])
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      )}
    </div>
  </div>
);


};

export default Calendar;
