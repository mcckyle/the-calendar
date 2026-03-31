//Filename: dateHelpers.js
//Author: Kyle McColgan
//Date: 30 March 2026
//Description: This file contains some helper functions for the Saint Louis calendar project.

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const getTotalDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const formatToISODate = (year, month, day) => {
  return new Date(year, month, day).toISOString().split('T')[0];
};

export const weekdayFormatter = (date, timeZone = "UTC") => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
};

export const dateFormatter = (date, timeZone = "UTC") => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};
