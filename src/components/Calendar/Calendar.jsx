// Calendar.jsx
import React, { useState, useEffect } from 'react';
import './Base.css';
import './Calendar.css';
import { useCalendarContext } from './CalendarContext';
import DaysOfWeek from './DaysOfWeek';
import events from '../../data/events.json';
import EventPanel from './EventPanel';
import MonthNavigation from './MonthNavigation';
import WeekDayColumn from './WeekDayColumn';

const Calendar = ({ hours, navigateWeek, getEventsForTimeSlot, renderTimeLabel }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [weekDays, setWeekDays] = useState([]);

  
	useEffect(() => {
	  const generateWeekDays = () => {
		const today = new Date();
		const weekDaysArray = Array.from({ length: 7 }, (_, i) => {
		  const day = new Date(today);
		  day.setDate(today.getDate() + i);
		  return day;
		});
		setWeekDays(weekDaysArray);
	  };

	  generateWeekDays();
	}, []); // Empty dependency array ensures this runs only once


  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowEventPanel(false); // Close the event panel if switching days
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventPanel(true); // Open the event panel
  };

  const closeEventPanel = () => {
    setShowEventPanel(false);
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <MonthNavigation
        onPrevWeek={() => navigateWeek(-1)}
        onNextWeek={() => navigateWeek(1)}
      />

      <div className="calendar-body">
        <DaysOfWeek />
        <div className="week-view">
          {(weekDays || []).map((day, index) => (
            <WeekDayColumn
              key={index}
              day={day}
              events={events || []} //Default to an empty array if undefined.
              hours={hours}
              getEventsForTimeSlot={getEventsForTimeSlot}
              onDayClick={handleDayClick}
              renderTimeLabel={renderTimeLabel}
              onEventClick={handleEventClick}
            />
          ))}
        </div>

        {/* Event Panel */}
        {showEventPanel && selectedEvent && (
          <EventPanel
            selectedDate={selectedDay}
            selectedEvent={selectedEvent}
            onClose={closeEventPanel}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
