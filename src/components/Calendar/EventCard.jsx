import React from 'react';
import './EventCard.css';

const EventCard = ({ title, date, time, description }) => {
  return (
    <div className="calendar-event" role="article" aria-labelledby={title}>
      <header className="event-header">
        <h3 className="event-title">{title}</h3>
        <p className="event-date-time">
          {date} at {time}
        </p>
      </header>
      {description && <p className="event-description">{description}</p>}
    </div>
  );
};

export default EventCard;
