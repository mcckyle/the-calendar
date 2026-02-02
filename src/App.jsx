//Filename: App.jsx
//Author: Kyle McColgan
//Date: 2 February 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React from "react";
import { CalendarProvider } from "./components/Calendar/CalendarContext";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

const App = () => {
  return (
    <CalendarProvider>
      <main className="app">
        <header className="calendar-intro">
          <h1 className="calendar-title">Saint Louis Events</h1>
          <p className="calendar-tagline">
            A curated weekly calendar of music, art, festivals, and community life.
          </p>
        </header>

        <section className="calendar-wrapper" aria-label="Weekly events calendar">
          <Calendar />
        </section>
      </main>
    </CalendarProvider>
  );
};

export default App;
