//Filename: App.jsx
//Author: Kyle McColgan
//Date: 27 April 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React from "react";
import { CalendarProvider } from "./components/Calendar/CalendarContext";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

const App = () => {
  return (
    <CalendarProvider>
      <main className="app">
        <header className="hero" aria-label="Saint Louis Events introduction">
          <div className="hero-content">
            <p className="eyebrow">Weekly cultural guide</p>
            <h1 className="title">
              Saint Louis <span className="title-accent">Events</span>
            </h1>
            <p className="tagline">
              A curated weekly calendar highlighting music, art, festivals,
              and community life across Saint Louis.
            </p>
          </div>
        </header>

        <section
          className="calendar-shell"
          aria-label="Weekly Saint Louis events calendar"
        >
          <Calendar />
        </section>
      </main>
    </CalendarProvider>
  );
};

export default App;
