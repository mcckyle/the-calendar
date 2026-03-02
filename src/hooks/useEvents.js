//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 1 March 2026
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar.

import { useState, useEffect, useRef } from "react";

export function useEvents(apiUrl, weekStart, weekEnd) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentController = useRef(null); //Keep a ref to the current controller.

  useEffect(() => {
    if ( ( ! apiUrl) || ( ! weekStart) || ( ! weekEnd))
    {
      return;
    }

    //Abort previous fetch, if any.
    currentController.current?.abort();

    const controller = new AbortController();
    currentController.current = controller;
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

            const response = await fetch(`${apiUrl}/api/events?${parameters}`, { signal });

            if ( ! response.ok)
            {
                throw new Error(`Event request failed (${response.status})`);
            }

            const data = await response.json();
            const rawEvents = data._embedded?.events ?? [];

            const normalized = rawEvents
              .map((event) => {
                const venue = event?._embedded?.venues?.[0] || {};
                const startISO = event?.dates?.start?.dateTime;
                const endISO = event?.dates?.end?.dateTime;

                if ( ! startISO)
                {
                  return null;
                }

                return {
                  id: event.id,
                  title: event.name ?? "Untitled Event",
                  date: startISO,
                  startTime: new Date(startISO),
                  endTime: endISO ? new Date(endISO) : null,
                  allDay: event?.dates?.start?.noSpecificTime ?? false,
                  description: event.info || event.pleaseNote || "",
                  venueName: venue?.name ?? "",
                  venueAddress: venue?.address?.line1 ?? "",
                  venueCity: venue?.city?.name ?? "",
                  venueState: venue?.state?.stateCode ?? "",
                  url: event.url ?? "",
                };
              })
              .filter(Boolean)
              .sort(
                 (a, b) =>
                   new Date(a.startTime).getTime() -
                   new Date(b.startTime).getTime()
              );
            setEvents(normalized);
      }
      catch (error)
      {
        if (error.name !== "AbortError")
        {
          setError(error.message || "Unable to load events!");
        }
      }
      finally
      {
        if ( ! signal.aborted)
        {
          setLoading(false);
        }
      }
    }

  fetchEvents();
  return () => controller.abort();

  }, [apiUrl, weekStart, weekEnd]);

  return { events, loading, error };
}
