//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 16 February 2026
//Description: This file contains the contained Event details for the Saint Louis React calendar project.

import React from "react";
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
	const dateObj = date ? new Date(date) : null;

	//Normalize the date...
	const formattedDate = dateObj && !isNaN(dateObj)
		? dateObj.toLocaleDateString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
          })
	    : null;

	//Normalize the start time...
	const startObj = startTime && !allDay ? new Date(startTime) : null;
	const endObj = endTime && !allDay ? new Date(endTime) : null;

    const formattedStartTime = startObj && !isNaN(startObj)
		? startObj.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			timeZone: "America/Chicago",
          })
		: null;
	const formattedEndTime = endObj && !isNaN(endObj)
	    ? endObj.toLocaleTimeString("en-US", {
		    hour: "numeric",
		    minute: "2-digit",
		    timeZone: "America/Chicago",
	      })
	    : null;

    const hasMeta = ( (formattedDate) || (formattedStartTime) || (allDay) );
    const hasVenue = ( (venueName) || (venueAddress) || (venueCity) || (venueState) );

	return (
	  <article className="event-card" aria-labelledby="event-card-title">
		<header className="event-card-header">
		  <h3 id="event-card-title" className="event-card-title">
		    {title}
		  </h3>

		  {hasMeta && (
            <div className="event-card-meta">
              {formattedDate && (
                <time className="event-date" dateTime={date}>
                  {formattedDate}
                </time>
              )}

              {allDay && <span className="event-time">All Day</span>}

              { ( ! allDay) && (formattedStartTime) && (
				<span className="event-time">
				  {formattedStartTime}
				  {formattedEndTime && ` - ${formattedEndTime}`}
				</span>
              )}
            </div>
          )}
        </header>

        {description && (
          <p className="event-card-description">{description}</p>
        )}

        {hasVenue && (
		  <address className="event-card-venue">
		    <span className="venue-label" aria-hidden="true">📍</span>
		    <span className="venue-text">
				{venueName}
				{venueAddress && `, ${venueAddress}`}
				{venueCity && `, ${venueCity}`}
				{venueState && `, ${venueState}`}
			</span>
		  </address>
		)}

		{url && (
		  <footer className="event-card-footer">
		    <a href={url} target="_blank" rel="noopener noreferrer">
			  View official event
			</a>
		  </footer>
		)}
	  </article>
	);
};

export default EventCard;
