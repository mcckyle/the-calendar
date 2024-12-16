import React from 'react';
import './Calendar.css'; // or specific EventCard.css if needed

const EventCard = ({ title }) => {
  return <div className="calendar-event">{title}</div>;
};

export default EventCard;
