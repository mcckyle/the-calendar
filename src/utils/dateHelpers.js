// dateHelpers.js
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const getTotalDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const formatToISODate = (year, month, day) => {
  return new Date(year, month, day).toISOString().split('T')[0];
};
