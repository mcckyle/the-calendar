//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 08 September 2025
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar.

import { useState, useEffect } from "react";

export function useEvents(apiUrl, weekStart, weekEnd) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      async function fetchEvents()
      {
          setLoading(true);

          try
          {
              const parameters = new URLSearchParams({
                  city: "Saint Louis",
                  start: weekStart,
                  end: weekEnd,
              });

              const response = await fetch(`${apiUrl}/api/events?${parameters.toString()}`);

              if( !response.ok)
              {
                  throw new Error("Failed to fetch events!");
              }

              const data = await response.json();
              const embedded = data._embedded?.events ?? [];
              const normalized = embedded.map(event => {
                const venue = event._embedded?.venues?.[0] || {};
                const dateTimeStr = event.dates?.start?.dateTime;
                const startTime = dateTimeStr ? new Date(dateTimeStr) : null;

                return {
                  id: event.id,
                  title: event.name,
                  startTime: startTime,
                  date: startTime ? startTime.toDateString() : null,
                  time: startTime ? startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"}) : null,
                  allDay: false,
                  description: event.info || event.pleaseNote || "",
                  venueName: venue.name || "Unknown venue",
                  venueAddress: venue.address?.line1 || "",
                  venueCity: venue.city?.name || "",
                  venueState: venue.state?.stateCode || "",
                  url: event.url || "",
                };
              }).filter(e => e.startTime !== null); // Only keep events with a valid starting time.
              setEvents(normalized);
        }
        catch(err)
        {
            setError(err.message);
        }
        finally
        {
            setLoading(false);
        }
      }

    fetchEvents();

  }, [apiUrl, weekStart, weekEnd]);

  return { events, loading, error };
}
