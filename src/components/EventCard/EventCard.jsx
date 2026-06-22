//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 22 June 2026
//Description: This file contains the embedded Event information for the Saint Louis React calendar project.

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
	const isValidDate = (value) =>
	{
		return value instanceof Date && !Number.isNaN(value.getTime());
    }

    const formatTime = (value) =>
	{
		const parsed = value ? new Date(value) : null;

		if (!isValidDate(parsed))
		{
			return null;
		}
		return parsed.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			timeZone: "America/Chicago",
		});
	};

	const parsedStart = startTime ? new Date(startTime) : null;

	//Normalize the date...
    const formattedDate =
        isValidDate(parsedStart)
        ? parsedStart.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "America/Chicago",
        }) : null;

    //Normalize the start time...
	const start = !allDay ? formatTime(startTime) : null;
	const end = !allDay ? formatTime(endTime) : null;
	const timeRange = start ? (end ? `${start} - ${end}` : start) : null;

    const venueString = [venueName, venueAddress, venueCity, venueState].filter(Boolean).join(", ");
    const hasMeta = ((formattedDate) || (timeRange) || (allDay));

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

              {(!allDay) && (timeRange) && (
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
            <span className="venue-text">{venueString}</span>
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
