import React from 'react';
import './EventCard.css';

const EventCard = ({ title, date, startTime, endTime, allDay, description }) => {
  // Format the time range.
  const formatTime = (start, end, allDay) => {
    if (allDay)
	{
      return 'All Day';
    }

    // Ensure startTime and endTime are valid.
    const startFormatted = start ? new Date(`2024-01-01T${start}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const endFormatted = end ? new Date(`2024-01-01T${end}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    if (!startFormatted) return 'Invalid Start Time';
    if (!endFormatted) return `Starts at ${startFormatted}`;
    return `From ${startFormatted} to ${endFormatted}`;
  };

  // Format the full date using toLocaleDateString for CST time zone explicitly...
  //const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
	  weekday: 'long',
	  month: 'long',
	  day: 'numeric',
	  year: 'numeric',
	});

  return (
    <div className="calendar-event" role="article" aria-labelledby={title}>
      <header className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date-time">
          {formattedDate} {allDay ? '' : `${formatTime(startTime, endTime, allDay)}`}
        </p>
      </header>
      {description && <p className="event-description">{description}</p>}
    </div>
  );
};

export default EventCard;
