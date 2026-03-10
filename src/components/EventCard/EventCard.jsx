//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 9 March 2026
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
	const isValidDate = (d) => d instanceof Date && !isNaN(d);
	const dateObj = date ? new Date(date) : null;

	//Normalize the date...
	const formattedDate =
        isValidDate(dateObj) &&
		dateObj.toLocaleDateString("en-US", {
			weekday: "long",
			month: "long",
			day: "numeric",
			year: "numeric",
			timeZone: "UTC",
		});

	//Normalize the start time...
	const startObj = startTime && !allDay ? new Date(startTime) : null;
	const endObj = endTime && !allDay ? new Date(endTime) : null;

	const formatTime = (d) =>
	  isValidDate(d)
		? d.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			timeZone: "America/Chicago",
		})
		: null;

    const formattedStartTime = formatTime(startObj);
	const formattedEndTime = formatTime(endObj);

	const timeRange =
	  formattedStartTime &&
      (formattedEndTime
        ? `${formattedStartTime} - ${formattedEndTime}`
        : formattedStartTime);

    const hasMeta = ( (formattedDate) || (timeRange) || (allDay) );
    const venueParts = [
		venueName,
		venueAddress,
		venueCity,
		venueState,
	].filter(Boolean);

	const venueString = venueParts.join(", ");

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

              { ( ! allDay) && (timeRange) && (
				<span className="event-time">{timeRange}</span>
              )}
            </div>
          )}
        </header>

        {description && (
          <p className="event-card-description">{description}</p>
        )}

        {venueString && (
		  <address className="event-card-venue">
		    <span className="venue-icon" aria-hidden="true">📍</span>
		    <span className="venue-text">{venueString}</span>
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
