//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains the EventCard.jsx component for the local Saint Louis React calendar project.

import React from 'react';
import './EventCard.css';

const EventCard = ({ title, date, startTime, endTime, allDay, description }) => {
  // Check if startTime is a valid Date object and format it
  const formattedStartTime =
    startTime instanceof Date && !isNaN(startTime.getTime())
      ? startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No Start Time Available";

  // Format the full date using toLocaleDateString for CST time zone explicitly...
  //const formattedDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  //console.log("Raw Date Input:", date);

	const formattedDate = date
	  ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
		  weekday: "long",
		  month: "long",
		  day: "numeric",
		  year: "numeric",
		})
	  : "Invalid Date";

	return (
	  <article className="event-card" role="article" aria-labelledby={`event-${title}`}>
		<header className="event-card-header">
		  <h3 id={`event-${title}`} className="event-card-title">{title}</h3>
			  <p className="event-card-meta">
			    <span className="event-date">{formattedDate}</span>
			    <span className="event-time">{!allDay && startTime ? ` • ${formattedStartTime}` : ''}</span>
              </p>
		</header>
		{description && <p className="event-card-description">{description}</p>}
	  </article>
	);
};

export default EventCard;
