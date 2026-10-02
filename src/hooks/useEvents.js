//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 2 October 2026
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar React project.

import { useState, useEffect, useRef } from "react";

//Simple in-memory cache.
const eventsCache = new Map();
const inFlightRequests = new Map();
const CACHE_TTL = 5 * 60 * 1000;
const getKey = (start, end) => `${start}_${end}`;

const normalizeEvents = (rawEvents = []) =>
{
  return rawEvents
    .map((event) =>
    {
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
        title: event.name ?? "Untitled Event",
        startTime: start,
        endTime: end,
        allDay: event?.dates?.start?.noSpecificTime ?? false,
        description: event.info ?? event.pleaseNote ?? "",
        venueName: venue?.name ?? "",
        venueAddress: venue?.address?.line1 ?? "",
        venueCity: venue?.city?.name ?? "",
        venueState: venue?.state?.stateCode ?? "",
        url: event.url ?? "",
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.startTime - b.startTime);
};

const getWeekRange = (date) =>
{
  const start = new Date(date);
  const end = new Date(date);

  end.setUTCDate(start.getUTCDate() + 6);
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
};

const getAdjacentWeeks = (date) =>
{
  const current = new Date(date);

  const previous = new Date(current);
  previous.setUTCDate(current.getUTCDate() - 7);

  const next = new Date(current);
  next.setUTCDate(current.getUTCDate() + 7);
  return {
    previous,
    next,
  };
};

const getCachedEvents = (key) =>
{
  const cached = eventsCache.get(key);

  if (!cached)
  {
    return null;
  }

  if (Date.now() >= cached.expiresAt)
  {
    eventsCache.delete(key);
    return null;
  }

  return cached.events;
};

const setCachedEvents = (key, events) =>
{
  eventsCache.set(key, {
    events,
    expiresAt: Date.now() + CACHE_TTL,
  });
};

const fetchEvents = async (apiUrl, start, end, signal) =>
{
  const key = getKey(start, end);

  const cached = getCachedEvents(key);

  if (cached)
  {
    return cached;
  }

  //Reuse an existing request for the same week.
  if (inFlightRequests.has(key))
  {
    return inFlightRequests.get(key);
  }

  const parameters = new URLSearchParams({
      city: "Saint Louis",
      start,
      end,
    });

    const request = fetch(
      `${apiUrl}/api/events?${parameters.toString()}`,
      { signal }
    )
      .then((response) =>
      {
        if (!response.ok)
        {
          throw new Error(`Event request failed (${response.status})`);
        }

        return response.json();
      })
      .then((data) =>
      {
        const events = normalizeEvents(data?._embedded?.events ?? []);
        setCachedEvents(key, events);
        return events;
      })
      .finally(() =>
      {
        inFlightRequests.delete(key);
      });

    inFlightRequests.set(key, request);

    return request;
};

const prefetchWeek = (apiUrl, date) =>
{
  const { start, end } = getWeekRange(date);
  const key = getKey(start, end);

  if ((getCachedEvents(key)) || (eventsCache.has(key)))
  {
    return;
  }

  fetchEvents(apiUrl, start, end).catch(() => {});
};

const prefetchAdjacentWeeks = (apiUrl, date) =>
{
  const { previous, next } = getAdjacentWeeks(date);
  prefetchWeek(apiUrl, previous);
  prefetchWeek(apiUrl, next);
};

export function useEvents(apiUrl, weekStart, weekEnd)
{
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null); //Keep a ref to the current controller.

  useEffect(() =>
  {
    if ((!apiUrl) || (!weekStart) || (!weekEnd))
    {
      setEvents([]);
      setLoading(false);
      setError(null);
      return;
    }

    const key = getKey(weekStart, weekEnd);
    const cached = getCachedEvents(key);

    //Serve immediately from cache.
    if (cached)
    {
      setEvents(cached);
      setLoading(false);
      setError(null);
      prefetchAdjacentWeeks(apiUrl, weekStart);

      return;
    }

    //Abort the previous foreground request.
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    //Prevent stale events from appearing under the new week.
    setEvents([]);
    setLoading(true);
    setError(null);

    const load = async () =>
    {
      try
      {
          const result = await fetchEvents(apiUrl, weekStart, weekEnd, controller.signal);

          if (controller.signal.aborted)
          {
              return;
          }

          setEvents(result);
          prefetchAdjacentWeeks(apiUrl, weekStart);
      }
      catch (error)
      {
        if (error.name === "AbortError")
        {
          return;
        }

        setEvents([]);
        setError(error.message ?? "Unable to load events!");
      }
      finally
      {
        if (!controller.signal.aborted)
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
