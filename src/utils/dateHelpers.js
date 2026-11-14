//Filename: dateHelpers.js
//Author: Kyle McColgan
//Date: 12 November 2026
//Description: This file contains some helper functions for the Saint Louis calendar project.

const CHICAGO_TIME_ZONE = "America/Chicago";

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC",
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});
const CHICAGO_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  timeZone: CHICAGO_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const isValidDate = (date) =>
  date instanceof Date && Number.isFinite(date.getTime());

//Construct a UTC date without the special handling of years 0-99.
const createUTCDate = (year, month, day) => {
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month, day);
  return date;
};

export const getFirstDayOfMonth = (year, month) => {
  return createUTCDate(year, month, 1).getUTCDay();
};

export const getTotalDaysInMonth = (year, month) => {
  return createUTCDate(year, month + 1, 0).getUTCDate();
};

export const formatToISODate = (year, month, day) => {
  const date = createUTCDate(year, month, day);

  return [
    String(date.getUTCFullYear()).padStart(4, "0"),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
};

export const getChicagoISODate = (date = new Date()) => {
  if (!isValidDate(date))
  {
    return "";
  }

  const parts = CHICAGO_DATE_FORMATTER.formatToParts(date);

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return [
    String(values.year).padStart(4, "0"),
    String(values.month).padStart(2, "0"),
    String(values.day).padStart(2, "0"),
  ].join("-");
};

export const weekdayFormatter = (date) => {
  return isValidDate(date) ? WEEKDAY_FORMATTER.format(date) : "";
};

export const dateFormatter = (date) => {
  return isValidDate(date) ? DATE_FORMATTER.format(date) : "";
};
