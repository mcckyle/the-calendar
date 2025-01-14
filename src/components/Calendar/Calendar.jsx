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

const Calendar = ({ hours }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const { currentDate, changeWeek, selectedDate } = useCalendarContext();
  
  const convertTo12HourFormat = (time) => {
	  const [hour, minute] = time.split(':').map(num => parseInt(num));
	  const isPM = hour >= 12;
	  const adjustedHour = hour % 12 || 12; // Convert hour to 12-hour format
	  const adjustedMinute = minute.toString().padStart(2, '0');
	  return `${adjustedHour}:${adjustedMinute} ${isPM ? 'PM' : 'AM'}`;
	};

  const [startOfWeek, setStartOfWeek] = useState(() => {
    // Initialize to the current week's start date
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday (0)
    return new Date(now.setDate(diff));
  });
  
    // Format the month name and year for the calendar header
  const renderMonthYear = () => {
    const monthOptions = { month: 'long', year: 'numeric' };
    return startOfWeek.toLocaleString('default', monthOptions);
  };

  const getEventsForTimeSlot = (day, hour) => {
    return events.filter(event => event.date === day.toDateString() && event.time === hour);
  };
  
    const renderTimeLabel = (hour) => {
    return `${hour}:00`;
  };
  
	const navigateWeek = (direction) => {
	  const newStartOfWeek = new Date(startOfWeek);
	  newStartOfWeek.setDate(startOfWeek.getDate() + direction * 7);

	  // Ensure the new date is correctly set to the start of the next week
	  setStartOfWeek(newStartOfWeek);
	};

  useEffect(() => {
    // Generate the week days based on the start of the week
	const generateWeekDays = () => {
	  const weekDaysArray = Array.from({ length: 7 }, (_, i) => {
		const day = new Date(startOfWeek);
		day.setDate(startOfWeek.getDate() + i);
		return day;
	  });
	  setWeekDays(weekDaysArray);
	};

    generateWeekDays();
  }, [startOfWeek]);


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
  
  const getWeekDates = () => {
    const weekDates = [];
    for (let i = 0; i < 7; i++)
	{
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(); // Get updated dates when startOfWeek changes
  
    // Filter events by selected day.
	const getEventsForDay = (day) => {
	  return events.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate.toDateString() === day.toDateString() || 
			   (event.allDay && eventDate.toDateString() === day.toDateString());
	  });
	};
	


  return (
    <div className="calendar-container">
      {/* Navigation Bar */}
      <div className="calendar-header">
        <button onClick={() => changeWeek(-1)}>Previous</button>
        <span>{renderMonthYear()}</span> {/* Show Month and Year */}
        <button onClick={() => changeWeek(1)}>Next</button>
      </div>

      <div className="calendar-body">
        {/* Weekly View */}
        <div className="week-view">
          {weekDates.map((day, index) => {
            const dayEvents = getEventsForDay(day); // Get events for this day
            const hours = Array.from({ length: 24 }, (_, i) => i); // 24 hours in a day

            return (
              <WeekDayColumn
                key={index}
                day={day}
                events={dayEvents}
                hours={hours}
                getEventsForTimeSlot={getEventsForTimeSlot}
                onDayClick={handleDayClick}
                renderTimeLabel={renderTimeLabel}
                onEventClick={handleEventClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
