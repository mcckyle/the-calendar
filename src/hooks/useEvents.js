//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 25 August 2025
//Description: This file contains the back end integration hook for the Saint Louis Calendar.

import { useState, useEffect } from "react";

export function useEvents(apiUrl, weekStart, weekEnd) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      async function fetchEvents() {
          setLoading(true);

          try
          {
              const response = await fetch(`${apiUrl}/events?start=${weekStart}&end=${weekEnd}`);

              if( !response.ok)
              {
                  throw new Error("Failed to fetch events!");

            }
            const date = await response.json();
            setEvents(data);
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
