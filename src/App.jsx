//Filename: App.jsx
//Author: Kyle McColgan
//Date: 17 June 2026
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React from "react";
import { CalendarProvider } from "./components/Calendar/CalendarContext";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

const App = () => {
  return (
    <CalendarProvider>
      <main className="app">
        <header className="hero">
          <p className="eyebrow">Weekly cultural guide</p>
          <h1 className="title">
            Saint Louis <span className="title-accent">Events</span>
          </h1>
          <p className="tagline">
            Music, art, festivals, food, and community life across STL.
          </p>
        </header>

        <section
          className="calendar-shell"
          aria-label="Saint Louis events calendar"
        >
          <Calendar />
        </section>
      </main>
    </CalendarProvider>
  );
};

export default App;
