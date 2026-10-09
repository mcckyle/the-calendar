//Filename: dateHelpers.js
//Author: Kyle McColgan
//Date: 8 October 2026
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

const isValidDate = (date) =>
  date instanceof Date && Number.isFinite(date.getTime());

export const getFirstDayOfMonth = (year, month) =>
  new Date(year, month, 1).getDay();

export const getTotalDaysInMonth = (year, month) =>
  new Date(year, month + 1, 0).getDate();

export const formatToISODate = (year, month, day) => {
  const date = new Date(Date.UTC(year, month, day));

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

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.year}-${values.month}-${values.day}`;
};

export const weekdayFormatter = (date) =>
  isValidDate(date) ? WEEKDAY_FORMATTER.format(date) : "";

export const dateFormatter = (date) =>
  isValidDate(date) ? DATE_FORMATTER.format(date) : "";
