//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 02 September 2025
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
              setEvents(embedded);
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
