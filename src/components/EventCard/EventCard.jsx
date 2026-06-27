//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 26 June 2026
//Description: This file contains the embedded Event information for the Saint Louis React calendar project.

import React from "react";
import { formatEventDate, formatEventTimeRange, formatVenue, hasEventMeta } from "../../utils/eventUtils";
import "./EventCard.css";

const EventCard = ({
	title,
	date,
	startTime,
	endTime,
	allDay,
	description,
	venueName,
	venueAddress,
	venueCity,
	venueState,
	url,
}) => {
	//Normalize the start time...
	const parsedStart = startTime ? new Date(startTime) : null;
	const formattedDate = formatEventDate(parsedStart);
	const timeRange = formatEventTimeRange(startTime, endTime, allDay);

    const venue = formatVenue({ venueName, venueAddress, venueCity, venueState});
    const showMeta = hasEventMeta({ date: formattedDate, time: timeRange, allDay });

    return (
	  <article className="event-card" aria-labelledby="event-card-title">
		<header className="event-card-header">
		  <h3 id="event-card-title" className="event-card-title">
		    {title}
		  </h3>

		  {showMeta && (
            <div className="event-card-meta">
              {formattedDate && (
                <time className="event-date" dateTime={date}>
                  {formattedDate}
                </time>
              )}

              {timeRange && (
                <span className="event-time">{timeRange}</span>
              )}
            </div>
          )}
        </header>

        {description && (
          <p className="event-card-description">{description}</p>
        )}

        {venue && (
          <address className="event-card-venue">
            <span className="venue-text">{venue}</span>
          </address>
		)}

		{url && (
		  <footer className="event-card-footer">
		    <a href={url} target="_blank" rel="noopener noreferrer">
			  Open event
			</a>
		  </footer>
		)}
	  </article>
    );
};

export default EventCard;
