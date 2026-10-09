//Filename: useEvents.js
//Author: Kyle McColgan
//Date: 9 October 2026
//Description: This file contains the hook to call the backend endpoint for the Saint Louis Calendar React project.

import { useState, useEffect, useRef } from "react";

//Simple in-memory cache.
const eventsCache = new Map();
const inFlightRequests = new Map();
const CACHE_TTL = 5 * 60 * 1000;
const getKey = (apiUrl, start, end) => `${apiUrl}|${start}_${end}`;

const normalizeEvents = (rawEvents = []) =>
  rawEvents
    .map((event) =>
    {
      const startISO = event?.dates?.start?.dateTime;

      if (!startISO)
      {
        return null;
      }

      const start = new Date(startISO);

      if (!Number.isFinite(start.getTime()))
      {
        return null;
      }

      const endISO = event?.dates?.end?.dateTime;
      const parsedEnd = endISO ? new Date(endISO) : null;
      const end = parsedEnd && Number.isFinite(parsedEnd.getTime())
        ? parsedEnd
        : null;

      const venue = event?._embedded.venues?.[0];

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
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

const getWeekRange = (date) =>
{
  const start = new Date(date);
  const end = new Date(date);

  end.setUTCDate(start.getUTCDate() + 6);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
};

const getAdjacentWeeks = (date) =>
{
  const previous = new Date(date);
  const next = new Date(date);

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
  eventsCache.set(key, {
    events,
    expiresAt: Date.now() + CACHE_TTL,
  });
};

const fetchEvents = async (apiUrl, start, end, signal) =>
{
  const key = getKey(apiUrl, start, end);
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

    let request;
    request = fetch(
      `${apiUrl}/api/events?${parameters.toString()}`,
      signal ? { signal } : undefined
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
        //An older request must not remove a newer request's entry.
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
  const { start, end } = getWeekRange(date);
  const key = getKey(apiUrl, start, end);

  if (getCachedEvents(key) !== null)
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
      catch (requestError)
      {
        if ((controller.signal.aborted) || (requestError.name === "AbortError"))
        {
          return;
        }

        setEvents([]);
        setError(requestError.message ?? "Unable to load events!");
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
    return () => {
      controller.abort();

      if (controllerRef.current === controller)
      {
        controllerRef.current = null;
      }
    };
  }, [apiUrl, weekStart, weekEnd]);

  return { events, loading, error };
}
