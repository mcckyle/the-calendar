//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 10 April 2026
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar.

import { useState, useEffect, useRef } from "react";

//Simple in-memory cache.
const eventsCache = new Map();
const getKey = (start, end) => `${start}_${end}`;

const normalizeEvents = (rawEvents = []) => {
  return rawEvents
  .map((event) => {
    const venue = event?._embedded?.venues?.[0];
    const startISO = event?.dates?.start?.dateTime;
    const endISO = event?.dates?.end?.dateTime;

    if (!startISO)
    {
      return null;
    }

    const start = new Date(startISO);
    const end = endISO ? new Date(endISO) : null;

    return {
      id: event.id,
      title: event.name || "Untitled Event",
      //date: startISO,
      startTime: start,
      endTime: end,
      allDay: event?.dates?.start?.noSpecificTime ?? false,
      description: event.info || event.pleaseNote || "",
      venueName: venue?.name || "",
      venueAddress: venue?.address?.line1 || "",
      venueCity: venue?.city?.name || "",
      venueState: venue?.state?.stateCode || "",
      url: event.url || "",
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.startTime - b.startTime);
};

const fetchAndCache = async (apiUrl, start, end, signal) => {
  const key = getKey(start, end);

  if (eventsCache.has(key))
  {
    return eventsCache.get(key);
  }

  const parameters = new URLSearchParams({
      city: "Saint Louis",
      start,
      end,
    });

    const response = await fetch(`${apiUrl}/api/events?${parameters}`, { signal });

    if (!response.ok)
    {
      throw new Error(`Event request failed (${response.status})`);
    }

    const data = await response.json();
    const normalized = normalizeEvents(data?._embedded?.events ?? []);

    eventsCache.set(key, normalized);

    return normalized;
};

const prefetchWeek = (apiUrl, startDate) => {
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setUTCDate(start.getUTCDate() + 6);

  const startISO = start.toISOString().split("T")[0];
  const endISO = end.toISOString().split("T")[0];
  const key = getKey(startISO, endISO);

  if (eventsCache.has(key))
  {
    return;
  }

  const controller = new AbortController();

  //Silent fail for prefetch...
  fetchAndCache(apiUrl, startISO, endISO, controller.signal).catch(() => {});
}

export function useEvents(apiUrl, weekStart, weekEnd) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null); //Keep a ref to the current controller.

  useEffect(() => {
    if ((!apiUrl) || (!weekStart) || (!weekEnd))
    {
      return;
    }

    const key = getKey(weekStart, weekEnd);

    //Serve instantly from cache, if available.
    if (eventsCache.has(key))
    {
      setEvents(eventsCache.get(key));
      setLoading(false);
      setError(null);

      //Still prefetch neighbors.
      const current = new Date(weekStart);

      const prev = new Date(current);
      prev.setUTCDate(current.getUTCDate() - 7);

      const next = new Date(current);
      next.setUTCDate(current.getUTCDate() + 7);

      prefetchWeek(apiUrl, prev);
      prefetchWeek(apiUrl, next);

      return;
    }

    //Abort any in-flight requests.
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;
    const { signal } = controller;

    const load = async () => {
      setLoading(true);
      setError(null);

      try
      {
          const result = await fetchAndCache(apiUrl, weekStart, weekEnd, signal);

          if (!signal.aborted)
          {
              setEvents(result);
          }

          //Prefetch adjacent weeks.
          const current = new Date(weekStart);

          const prev = new Date(current);
          prev.setUTCDate(current.getUTCDate() - 7);

          const next = new Date(current);
          next.setUTCDate(current.getUTCDate() + 7);

          prefetchWeek(apiUrl, prev);
          prefetchWeek(apiUrl, next);
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
        if (!signal.aborted)
        {
          setLoading(false);
        }
      }
    };

    load();
    return () => controller.abort();
  }, [apiUrl, weekStart, weekEnd]);

  return { events, loading, error };
}
