//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 30 January 2026
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar.

import { useState, useEffect } from "react";

export function useEvents(apiUrl, weekStart, weekEnd) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchEvents()
    {
        setLoading(true);
        setError(null);

        try
        {
            const parameters = new URLSearchParams({
                city: "Saint Louis",
                start: weekStart,
                end: weekEnd,
            });

            const response = await fetch(`${apiUrl}/api/events?${parameters.toString()}`, { signal });

            if ( ! response.ok)
            {
                throw new Error("Failed to fetch events!");
            }

            const data = await response.json();
            const embedded = data._embedded?.events ?? [];

            const normalized = embedded
              .map(event => {
                const venue = event._embedded?.venues?.[0] || {};
                const dateTimeStr = event.dates?.start?.dateTime;
                const startTime = dateTimeStr ? new Date(dateTimeStr) : null;

                return startTime
                  ? {
                      id: event.id,
                      title: event.name,
                      startTime,
                      date: startTime.toDateString(),
                      time: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"}),
                      allDay: false,
                      description: event.info || event.pleaseNote || "",
                      venueName: venue.name || "Unknown venue",
                      venueAddress: venue.address?.line1 || "",
                      venueCity: venue.city?.name || "",
                      venueState: venue.state?.stateCode || "",
                      url: event.url || "",
                    }
                  : null;
                }).filter(Boolean);
            setEvents(normalized);
      }
      catch (error)
      {
        if (error.name !== "AbortError")
        {
          setError(error.message);
        }
      }
      finally
      {
          setLoading(false);
      }
    }

  fetchEvents();
  return () => controller.abort();

  }, [apiUrl, weekStart, weekEnd]);

  return { events, loading, error };
}
