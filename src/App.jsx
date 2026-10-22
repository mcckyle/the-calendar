//Filename: App.jsx
//Author: Kyle McColgan
//Date: 22 October 2026
//Description: This file contains the parent component for the Saint Louis Events React project.

import { CalendarProvider } from "./components/Calendar/CalendarContext";
import Calendar from "./components/Calendar/Calendar";

import "./App.css";

const App = () => (
    <CalendarProvider>
      <main className="app" aria-label="Saint Louis Events">
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Saint Louis, Missouri · Weekly Guide</p>
            <h1 className="title">
              Saint Louis <span>Events</span>
            </h1>
            <p className="tagline">
              Discover music, art, festivals, food, and community life across STL.
            </p>
          </div>
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

export default App;
