//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 04 September 2025
//Description: This file contains the contained Event details for the Saint Louis React calendar project.

import React from 'react';
import './EventCard.css';

const EventCard = ({ title, date, startTime, endTime, allDay, description }) => {

	//Normalize the date...
	let formattedDate = "Invalid Date";
	if (date)
	{
		const dateObj = date instanceof Date ? date : new Date(date);

		if(!isNaN(dateObj.getTime()))
		{
			formattedDate = dateObj.toLocaleDateString("en-US", {
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric",
			});
		}
	}

	//Normalize the start time...
	let formattedStartTime = "";
	if ( (!allDay) && (startTime) )
	{
		const startObj = startTime instanceof Date ? startTime : new Date(startTime);

		if(!isNaN(startObj.getTime()))
		{
			formattedStartTime = startObj.toLocaleDateString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
			});
		}
	}

	return (
	  <article className="event-card" role="article" aria-labelledby={`event-${title}`}>
		<header className="event-card-header">
		  <h3 id={`event-${title}`} className="event-card-title">{title}</h3>
			  <p className="event-card-meta">
			    <span className="event-date">{formattedDate}</span>
			    {formattedStartTime && <span className="event-time"> • {formattedStartTime}</span>}
              </p>
		</header>
		{description && <p className="event-card-description">{description}</p>}
	  </article>
	);
};

export default EventCard;
