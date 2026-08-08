//Filename: DaysOfWeek.jsx
//Author: Kyle McColgan
//Date: 7 August 2026
//Description: This file contains the row of date labels for the Saint Louis calendar React project.

import React, { useMemo } from "react";
import { dateFormatter, getChicagoISODate, weekdayFormatter } from "../../utils/dateHelpers";
import "./DaysOfWeek.css";

const DaysOfWeek = ({ weekDays = [] }) =>
{
  const todayISO = useMemo(() => getChicagoISODate(), []);

  return (
    <header className="days-of-week" role="row" aria-label="Days of the week">
      {weekDays.map((day) =>
      {
        const iso = getChicagoISODate(day);
        const isToday = iso === todayISO;

        return (
          <div
            key={iso}
            className={`day-item ${isToday ? "is-today" : ""}`}
            role="columnheader"
            aria-current={isToday ? "date" : undefined}
          >
            <span className="day-label">{weekdayFormatter(day)}</span>
            <time
              className="day-date"
              dateTime={iso}
            >
              {dateFormatter(day)}
            </time>
          </div>
        );
      })}
    </header>
  );
};

export default DaysOfWeek;
