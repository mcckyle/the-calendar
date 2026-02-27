//Filename: App.jsx
//Author: Kyle McColgan
//Date: 26 February 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React from "react";
import { CalendarProvider } from "./components/Calendar/CalendarContext";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

const App = () => {
  return (
    <CalendarProvider>
      <main className="app">
        <header className="app-header">
          <div className="app-header-inner">
            <h1 className="app-title">Saint Louis Events</h1>
            <p className="app-tagline">
              A curated weekly calendar of music, art, festivals, and community life.
            </p>
          </div>
        </header>

        <section className="calendar-shell" aria-label="Weekly events calendar">
          <Calendar />
        </section>
      </main>
    </CalendarProvider>
  );
};

export default App;
