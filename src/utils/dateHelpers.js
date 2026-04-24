//Filename: dateHelpers.js
//Author: Kyle McColgan
//Date: 23 April 2026
//Description: This file contains some helper functions for the Saint Louis calendar project.

export const getFirstDayOfMonth = (year, month) => {
  new Date(year, month, 1).getDay();
};

export const getTotalDaysInMonth = (year, month) => {
  new Date(year, month + 1, 0).getDate();
};

export const formatToISODate = (year, month, day) => {
  new Date(Date.UTC(year, month, day)).toISOString().split('T')[0];
};

export const getChicagoISODate = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

  return `${map.year}-${map.month}-${map.day}`;
};

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

export const weekdayFormatter = (date) => {
  if (!(date instanceof Date))
  {
    return ""; // Guard against invalid input...
  }
  return WEEKDAY_FORMATTER.format(date);
};

export const dateFormatter = (date) => {
  if (!(date instanceof Date))
  {
    return ""; // Guard against invalid input...
  }
  return DATE_FORMATTER.format(date);
};
