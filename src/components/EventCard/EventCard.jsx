//Filename: EventCard.jsx
//Author: Kyle McColgan
//Date: 19 December 2025
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

	//Normalize the date...
	let formattedDate = "Invalid Date";
	if (date)
	{
		const dateObj = date instanceof Date ? date : new Date(date);

		if (!isNaN(dateObj.getTime()))
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
	if ( ( ! allDay) && (startTime) )
	{
		const startObj = startTime instanceof Date ? startTime : new Date(startTime);

		if ( !isNaN(startObj.getTime()))
		{
			formattedStartTime = startObj.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				timeZone: "America/Chicago",
			});
		}
	}

	return (
	  <article className="event-card" aria-labelledby="event-card-title">
		<header className="event-card-header">
		  <h3 id="event-card-title" className="event-card-title">
		    {title}
		  </h3>

		  <p className="event-card-meta">
		    <time className="event-date">{formattedDate}</time>
		    {formattedStartTime && (
				<span className="event-time">• {formattedStartTime}</span>
			)}
		  </p>
		</header>

		{description && (
			<section className="event-card-description">
			  {description}
			</section>
		)}

		{(venueName || venueAddress || venueCity || venueState) && (
		  <p className="event-card-venue">
		    <span className="venue-label" aria-hidden="true">📍</span>
		    <span>
				{venueName}
				{venueAddress && `, ${venueAddress}`}
				{venueCity && `, ${venueCity}`}
				{venueState && `, ${venueState}`}
			</span>
		  </p>
		)}

		{url && (
		  <p className="event-card-link">
		    <a href={url} target="_blank" rel="noopener noreferrer">
			  View official event
			</a>
		  </p>
		)}
	  </article>
	);
};

export default EventCard;
