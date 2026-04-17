//Filename: eventUtils.js
//Author: Kyle McColgan
//Date: 14 April 2026
//Description: This file contains Calendar-related helper functions for the Saint Louis calendar project.

const TIMEZONE = "America/Chicago";

export const formatTime = (date) => {
    if (!(date instanceof Date) || (Number.isNaN(date)))
    {
        return null;
    }

    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: TIMEZONE,
    }).format(date);
};

export const convertTo12HourFormat = (time) => {
    if (!time)
    {
        return "";
    }

    const [hour, minute] = time.split(':').map(Number);
    if ((Number.isNaN(hour)) || (Number.isNaN(minute)))
    {
        return "";
    }

    const isPM = hour >= 12;
    const adjustedHour = hour % 12 || 12; // Convert hour to 12-hour format.
    const adjustedMinute = minute.toString().padStart(2, "0");
    return `${adjustedHour}:${adjustedMinute} ${isPM ? "PM" : "AM"}`;
};

// Helper function to parse 12-hour time into a Date object.
export const parseEventTime = (date, time) => {
    if ( (!date) || (!time))
    {
        return null;
    }

    const [timePart, modifier] = time.split(" ");
    if ( (!timePart) || (!modifier))
    {
        return null;
    }

    let [hours, minutes] = timePart.split(":").map(Number);

    if ((Number.isNaN(hours)) || (Number.isNaN(minutes)))
    {
        return null;
    }

    if ( (modifier === "PM") && (hours !== 12))
    {
        hours += 12; // Convert PM hours to 24-hour format.
    }
    if ( (modifier === "AM") && (hours === 12) )
    {
        hours = 0; // Convert midnight (12 AM) to 0.
    }

    // Create a Date object with the parsed time
    const parsedDate = new Date(`${date}T00:00:00`); // Start with the date at midnight.
    parsedDate.setHours(hours, minutes, 0, 0); // Set the correct hours and minutes.

    return parsedDate;
};

// *** Legacy normalizeEvents for events.json events. ***
// export const normalizeEvents = (events) =>
// events.map((event) => {
//     const date = event.date || "";
//     const allDay = event.allDay ?? (!event.startTime && !event.endTime);
//
//     // If it's an all-day event, no need to parse startTime or endTime.
//     const startTimeDate = !allDay && event.startTime ? parseEventTime(date, event.startTime) : null;
//     const endTimeDate = !allDay && event.endTime ? parseEventTime(date, event.endTime) : null;
//
//     // Log invalid date warnings.
//     if (!allDay && (!startTimeDate || isNaN(startTimeDate)))
//     {
//         console.error("Invalid Date created for event:", event);
//     }
//
//     return {
//         id: event.id,
//         title: event.title || "Untitled Event",
//         date: date, // Keep the raw date string.
//         startTime: startTimeDate,
//         endTime: endTimeDate,
//         allDay: allDay, // Explicitly mark allDay.
//     };
// });

// *** New Updated normalizeEvents for the Ticketmaster API. ***
// export function normalizeEvents(events)
// {
//     return events.map(event => {
//         const startTime = event.dates?.start?.dateTime
//           ? new Date(event.dates.start.dateTime)
//           : null;
//
//         return {
//             id: event.id,
//             title: event.name,
//             venue: event._embedded?.venues?.[0]?.name ?? "Unknown venue",
//             city: event._embedded?.venues?.[0]?.city?.name ?? "Unknown city",
//             startTime: startTime,
//             date: startTime ? startTime.toDateString() : null,
//             time: startTime ? startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : null
//         };
//     }).filter(e => e.startTime !== null);
// }

export const filterEventsByDay = (events, day) => {
    if (!(day instanceof Date))
    {
        return []; // Guard against invalid input...
    }

    const startOfDay = new Date(day); // Local start of the day.
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1); // Local end of the day.

    return events.filter(
        (event) =>
          event.startTime instanceof Date &&
          event.startTime >= startOfDay &&
          event.startTime < endOfDay
    );
};

const getChicagoParts = (date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TIMEZONE,
        hour: "numeric",
        hour12: false,
        year: "numeric",
        month: "numeric",
        day: "numeric",
    }).formatToParts(date);

    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

    return {
        hour: Number(map.hour),
        year: Number(map.year),
        month: Number(map.month),
        day: Number(map.day),
    };
};

export const groupEventsByHour = (day, events) => {
    if (!(day instanceof Date))
    {
        return Array.from({ length: 24 }, () => []); // Guard against invalid input...
    }

    const eventsByHour = Array.from({ length: 24 }, () => []); // Create 24 independent arrays.
    const target = getChicagoParts(day);
    //const dayEvents = filterEventsByDay(events, day);

    for (const event of events)
    {
        if (!(event.startTime instanceof Date))
        {
            continue;
        }

        //const hour = event.startTime.getHours(); // Extract the hour from event time (local time).
        const parts= getChicagoParts(event.startTime);

        //Compare in SAME timezone (Chicago).
        const isSameDay =
          parts.year === target.year &&
          parts.month === target.month &&
          parts.day === target.day;

        if (!isSameDay)
        {
            continue;
        }

        eventsByHour[parts.hour].push(event); // Add event to the correct hour.
    }

    return eventsByHour;
};
