//Filename: eventUtils.js
//Author: Kyle McColgan
//Date: 25 August 2025
//Description: This file contains the helper functions for the Saint Louis calendar project.

export const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':').map(num => parseInt(num));
    const isPM = hour >= 12;
    const adjustedHour = hour % 12 || 12; // Convert hour to 12-hour format.
    const adjustedMinute = minute.toString().padStart(2, '0');
    return `${adjustedHour}:${adjustedMinute} ${isPM ? 'PM' : 'AM'}`;
};

// Helper function to parse 12-hour time into a Date object.
export const parseEventTime = (date, time) => {
    if (!date || !time) return null;

    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart ? timePart.split(":").map(Number) : [0, 0];

    if (modifier === "PM" && hours !== 12)
    {
        hours += 12; // Convert PM hours to 24-hour format.
    }
    if (modifier === "AM" && hours === 12)
    {
        hours = 0; // Convert midnight (12 AM) to 0.
    }

    // Create a Date object with the parsed time
    const parsedDate = new Date(`${date}T00:00:00`); // Start with the date at midnight.
    parsedDate.setHours(hours, minutes, 0, 0); // Set the correct hours and minutes.

    return parsedDate;
};

export const normalizeEvents = (events) =>
events.map((event) => {
    const date = event.date || "";
    const allDay = event.allDay ?? (!event.startTime && !event.endTime);

    // If it's an all-day event, no need to parse startTime or endTime.
    const startTimeDate = !allDay && event.startTime ? parseEventTime(date, event.startTime) : null;
    const endTimeDate = !allDay && event.endTime ? parseEventTime(date, event.endTime) : null;

    // Log invalid date warnings.
    if (!allDay && (!startTimeDate || isNaN(startTimeDate)))
    {
        console.error("Invalid Date created for event:", event);
    }

    return {
        id: event.id,
        title: event.title || "Untitled Event",
        date: date, // Keep the raw date string.
        startTime: startTimeDate,
        endTime: endTimeDate,
        allDay: allDay, // Explicitly mark allDay.
    };
});

export const filterEventsByDay = (events, day) => {
    if( (!day) || !(day instanceof Date))
    {
        return []; // Guard against invalid input...
    }

    const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate()); // Local start of the day.
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1); // Local end of the day.

    return events.filter(
        (event) => event.startTime >= startOfDay && event.startTime < endOfDay
    );
};

export const groupEventsByHour = (day, events) => {
    if( (!day) || !(day instanceof Date))
    {
        return Array.from({ length: 24 }, () => []); // Guard against invalid input...
    }

    const eventsByHour = Array.from({ length: 24 }, () => []); // Create 24 independent arrays.
    const dayEvents = filterEventsByDay(events, day);

    dayEvents.forEach((event) => {
        if(event.startTime instanceof Date)
        {
            const hour = event.startTime.getHours(); // Extract the hour from event time (local time).
            eventsByHour[hour].push(event); // Add event to the correct hour.
        }
    });

    return eventsByHour;
};
