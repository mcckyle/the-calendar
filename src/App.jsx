//Filename: App.jsx
//Author: Kyle McColgan
//Date: 6 November 2025
//Description: This file contains the parent component for the Saint Louis calendar React project.

import React from 'react';
import { CalendarProvider } from './components/Calendar/CalendarContext';
import Calendar from './components/Calendar/Calendar';

import './App.css';

const App = () => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    `${i.toString().padStart(2, '0')}:00`
  );

  return (
    <CalendarProvider>
      <main className="app" aria-label="Saint Louis Event Calendar">
        <header className="calendar-intro">
          <h1 className="calendar-title">Saint Louis Events</h1>
          <p className="calendar-tagline">
            Explore the rhythm of the city - music, art, and community, all in one view.
          </p>
        </header>

        <section className="calendar-wrapper" role="region" aria-label="Weekly View">
          <Calendar hours={hours} />
        </section>
      </main>
    </CalendarProvider>
  );
};

export default App;
