//Filename: eventUtils.js
//Author: Kyle McColgan
//Date: 13 November 2026
//Description: This file contains Calendar-related helper functions for the Saint Louis Events React project.

const TIMEZONE = "America/Chicago";

const CHICAGO_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
});
const CHICAGO_DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
});

const isValidDate = (value) =>
  value instanceof Date && Number.isFinite(value.getTime());

export const isValidEventDate = isValidDate;

const getChicagoParts = (date) => {
    const parts = CHICAGO_DATE_TIME_FORMATTER.formatToParts(date);

    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

    return {
        year: Number(values.year),
        month: Number(values.month),
        day: Number(values.day),
        hour: Number(values.hour),
    };
};

const chicagoWallTimeToDate = (year, month, day, hour, minute) => {
    const targetDate = new Date(0);
    targetDate.setUTCHours(0, 0, 0, 0);
    targetDate.setUTCFullYear(year, month - 1, day);
    targetDate.setUTCHours(hour, minute, 0, 0);

    const targetTimestamp = targetDate.getTime();

    if (!Number.isFinite(targetTimestamp))
    {
        return null;
    }

    let result = new Date(targetTimestamp);

    //Iteratively correct the UTC candidate against Chicago wall time.
    for (let attempt = 0; attempt < 4; attempt += 1)
    {
        const parts = CHICAGO_DATE_TIME_FORMATTER.formatToParts(result);

        const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

        const represented = new Date(0);
        represented.setUTCHours(0, 0, 0, 0);
        represented.setUTCFullYear(Number(values.year), Number(values.month) - 1, Number(values.day));
        represented.setUTCHours(Number(values.hour), Number(values.minute), 0);

        const difference = targetTimestamp - represented.getTime();

        if (difference === 0)
        {
            break;
        }

        result = new Date(result.getTime() + difference);
    }

    //Reject wall-clock times that do not exist because of DST.
    const actual = getChicagoParts(result);
    const matchesTarget =
        actual.year === year &&
        actual.month === month &&
        actual.day === day &&
        actual.hour === hour &&
        Number(
            CHICAGO_DATE_TIME_FORMATTER
              .formatToParts(result)
              .find(({ type }) => type === "minute")?.value
        ) === minute;

    return matchesTarget ? result : null;
};

export const formatEventDate = (value) =>
{
    if (!isValidDate(value))
    {
        return null;
    }

    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: TIMEZONE,
    }).format(value);
};

export const formatEventTimeRange = (startTime, endTime, allDay) =>
{
    if (allDay)
    {
        return "All Day";
    }

    const start = formatTime(startTime ? new Date(startTime) : null);

    if (!start)
    {
        return null;
    }

    const end = formatTime(endTime ? new Date(endTime) : null);

    return end ? `${start} - ${end}` : start;
};

export const formatVenue = ({
    venueName,
    venueAddress,
    venueCity,
    venueState
} = {}) => {
  return [venueName, venueAddress, venueCity, venueState]
    .filter((value) => typeof value === "string" && value.trim().length > 0)
    .map((value) => value.trim())
    .join(", ");
};

export const hasEventMeta = (dateOrMeta, time, allDay) => {
    if ((dateOrMeta !== null) && (typeof dateOrMeta === "object") && (!(dateOrMeta instanceof Date)))
    {
        return Boolean(dateOrMeta.date || dateOrMeta.time || dateOrMeta.allDay);
    }

    return Boolean(dateOrMeta || time || allDay);
};

export const formatTime = (date) => {
    if (!isValidDate(date))
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
    if ((typeof time !== "string") || (!time.trim()))
    {
        return "";
    }

    const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);

    if (!match)
    {
        return "";
    }

    const hour = Number(match[1]);
    const minute = Number(match[2]);

    if ((hour < 0) || (hour > 23) || (minute < 0) || (minute > 59))
    {
        return "";
    }

    const adjustedHour = hour % 12 || 12; // Convert hour to 12-hour format.
    const modifier = hour >= 12 ? "PM" : "AM";
    return `${adjustedHour}:${String(minute).padStart(2, "0")}${modifier}`;
};

//Parse a 12-hour clock value into a Chicago-local date.
const parseTime = (time) => {
    if (typeof time !== "string")
    {
        return null;
    }

    const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

    if (!match)
    {
        return null;
    }

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const modifier = match[3].toUpperCase();

    if ((hour < 1) || (hour > 12) || (minute > 59))
    {
        return null;
    }

    if ((modifier === "PM") && (hour !== 12))
    {
        hour += 12;
    }
    else if ((modifier === "AM") && (hour === 12))
    {
        hour = 0;
    }

    return { hour, minute };
};

// Helper function to parse 12-hour time into a Date object.
export const parseEventTime = (date, time) => {
    if ((typeof date !== "string") || (typeof time !== "string"))
    {
        return null;
    }

    const dateMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const parsedTime = parseTime(time);

    if ((!dateMatch) || (!parsedTime))
    {
        return null;
    }

    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const day = Number(dateMatch[3]);

    //Validate the calendar date without relying on a local timezone.
    const validationDate = new Date(0);
    validationDate.setUTCHours(0, 0, 0, 0);
    validationDate.setUTCFullYear(year, month - 1, day);

    if ((validationDate.getUTCFullYear() !== year) || (validationDate.getUTCMonth() !== month - 1) || (validationDate.getUTCDate() !== day))
    {
        return null;
    }

    return chicagoWallTimeToDate(year, month, day, parsedTime.hour, parsedTime.minute);
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
    if ((!Array.isArray(events)) || (!isValidDate(day)))
    {
        return []; // Guard against invalid input...
    }

    const target = getChicagoParts(day);

    return events.filter((event) => {
        if (!isValidDate(event?.startTime))
        {
            return false;
        }

        const start = getChicagoParts(event.startTime);

        return (
            start.year === target.year &&
            start.month === target.month &&
            start.day === target.day
        );
    });
};

export const groupEventsByHour = (day, events) => {
    const eventsByHour = Array.from({ length: 24 }, () => []); // Create 24 independent arrays.

    if ((!isValidDate(day)) || (!Array.isArray(events)))
    {
        return eventsByHour;
    }

    const target = getChicagoParts(day);

    for (const event of events)
    {
        if (!isValidDate(event?.startTime))
        {
            continue;
        }

        const start = getChicagoParts(event.startTime);
        const matchesDay =
            start.year === target.year &&
            start.month === target.month &&
            start.day === target.day;

        if (!matchesDay)
        {
            continue;
        }

        eventsByHour[start.hour].push(event); // Add event to the correct hour.
    }

    return eventsByHour;
};
