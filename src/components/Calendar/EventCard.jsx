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
	console.log("Raw Date Input:", date);

	const formattedDate = date
	  ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
		  weekday: "long",
		  month: "long",
		  day: "numeric",
		  year: "numeric",
		})
	  : "Invalid Date";

	return (
	  <div className="calendar-event" role="article" aria-labelledby={title}>
		<header className="event-header">
		  <h3 className="event-title">{title}</h3>
			  <p className="event-date-time">
				{formattedDate}{" "}
			  </p>
              <p>Start Time: {formattedStartTime}</p>

		</header>
		{description && <p className="event-description">{description}</p>}
	  </div>
	);
};

export default EventCard;
