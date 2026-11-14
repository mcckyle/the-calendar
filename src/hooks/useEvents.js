//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 13 November 2026
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar React project.

import { useState, useEffect, useRef } from "react";

const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 24;

//Simple in-memory cache.
const eventsCache = new Map();
const inFlightRequests = new Map();

const normalizeApiUrl = (apiUrl) =>
  apiUrl.replace(/\/+$/, "");

const getKey = (apiUrl, start, end) =>
  `${normalizeApiUrl(apiUrl)}|${start}_${end}`;

const isValidDate = (date) =>
  date instanceof Date && Number.isFinite(date.getTime());

const normalizeEvents = (rawEvents = []) =>
{
  if (!Array.isArray(rawEvents))
  {
    return [];
  }

  return rawEvents
    .map((event) =>
    {
      const startISO = event?.dates?.start?.dateTime;

      if ((typeof startISO !== "string") || (!startISO))
      {
        return null;
      }

      const start = new Date(startISO);

      if (!isValidDate(start))
      {
        return null;
      }

      const endISO = event?.dates?.end?.dateTime;
      const parsedEnd = typeof endISO === "string"
      ? new Date(endISO)
      : null;
      const end = isValidDate(parsedEnd)
      ? parsedEnd
      : null;

      const venue = event?._embedded?.venues?.[0];

      return {
        id: event.id,
        title: event.name || "Untitled Event",
        startTime: start,
        endTime: end,
        allDay: event?.dates?.start?.noSpecificTime === true,
        description: event.info ?? event.pleaseNote ?? "",
        venueName: venue?.name ?? "",
        venueAddress: venue?.address?.line1 ?? "",
        venueCity: venue?.city?.name ?? "",
        venueState: venue?.state?.stateCode ?? "",
        url: event.url ?? "",
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
};

const getWeekRange = (date) =>
{
  const start = new Date(date);
  if (!isValidDate(start))
  {
    return null;
  }

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
};

const getAdjacentWeeks = (date) =>
{
  const current = new Date(date);
  if (!isValidDate(current))
  {
    return null;
  }

  const previous = new Date(current);
  const next = new Date(current);

  previous.setUTCDate(previous.getUTCDate() - 7);
  next.setUTCDate(next.getUTCDate() + 7);

  return { previous, next };
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
  const now = Date.now();

  //Remove expired entries before adding another.
  for (const [cacheKey, cached] of eventsCache)
  {
    if (now >= cached.expiresAt)
    {
      eventsCache.delete(cacheKey);
    }
  }

  //Refresh insertion order for recently used entries.
  eventsCache.delete(key);

  while(eventsCache.size >= MAX_CACHE_ENTRIES)
  {
    const oldestKey = eventsCache.keys().next().value;
    eventsCache.delete(oldestKey);
  }

  eventsCache.set(key, {
    events,
    expiresAt: now + CACHE_TTL,
  });
};

const getRequestError = async (response) =>
{
  const fallback = `Event request failed (${response.status})`;

  try
  {
    const body = await response.json();
    return body?.error || body?.message || fallback;
  }
  catch
  {
    return fallback;
  }
};

const fetchEvents = async (apiUrl, start, end, signal) =>
{
  const baseUrl = normalizeApiUrl(apiUrl);
  const key = getKey(baseUrl, start, end);
  const cached = getCachedEvents(key);

  if (cached !== null)
  {
    return cached;
  }

  const existing = inFlightRequests.get(key);

  //Reuse requests that cannot be cancelled by another consumer.
  //A request tied to a component's signal must not be shared with
  //another consumer that could abort it.
  if ((existing) && (!existing.hasSignal))
  {
    return existing.promise;
  }

  const parameters = new URLSearchParams({
    city: "Saint Louis",
    start,
    end,
  });

  const request = fetch(
    `${baseUrl}/api/events?${parameters.toString()}`,
                        signal ? { signal } : undefined
  )
  .then(async (response) =>
  {
    if (!response.ok)
    {
      throw new Error(await getRequestError(response));
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
    //Do not let an older request remove a newer request's entry.
    if (inFlightRequests.get(key)?.promise === request)
    {
      inFlightRequests.delete(key);
    }
  });

  inFlightRequests.set(key, {
    promise: request,
    hasSignal: Boolean(signal),
  });

  return request;
};

const prefetchWeek = (apiUrl, date) =>
{
  const range = getWeekRange(date);
  if (!range)
  {
    return;
  }

  const { start, end } = range;
  const key = getKey(apiUrl, start, end);

  if (getCachedEvents(key) !== null)
  {
    return;
  }

  fetchEvents(apiUrl, start, end).catch(() => {});
};

const prefetchAdjacentWeeks = (apiUrl, date) =>
{
  const adjacent = getAdjacentWeeks(date);
  if (!adjacent)
  {
    return;
  }

  prefetchWeek(apiUrl, adjacent.previous);
  prefetchWeek(apiUrl, adjacent.next);
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
      controllerRef.current?.abort();
      controllerRef.current = null;

      setEvents([]);
      setLoading(false);
      setError(null);

      return undefined;
    }

    const key = getKey(apiUrl, weekStart, weekEnd);
    const cached = getCachedEvents(key);

    controllerRef.current?.abort();

    //Serve immediately from cache.
    if (cached !== null)
    {
      controllerRef.current = null;
      setEvents(cached);
      setLoading(false);
      setError(null);
      prefetchAdjacentWeeks(apiUrl, weekStart);

      return undefined;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    //Do not display events belonging to the previous week.
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
      catch (requestError)
      {
        if ((controller.signal.aborted) || (requestError?.name === "AbortError"))
        {
          return;
        }

        setEvents([]);
        setError(requestError?.message || "Unable to load events!");
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
    return () =>
    {
      controller.abort();

      if (controllerRef.current === controller)
      {
        controllerRef.current = null;
      }
    };
  }, [apiUrl, weekStart, weekEnd]);

  return { events, loading, error };
}
