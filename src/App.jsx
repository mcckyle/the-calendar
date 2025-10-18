//Filename: App.jsx
//Author: Kyle McColgan
//Date: 17 October 2025
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
    <div className="app">
      <CalendarProvider>
        <main className="calendar-wrapper" aria-label="Saint Louis Event Calendar">
          <header className="calendar-intro">
            <h1 className="calendar-title">Saint Louis Events</h1>
            <p className="calendar-tagline">
              Explore the rhythm of the city - from music and art to community gatherings.
            </p>
          </header>
          <Calendar hours={hours} />
        </main>
      </CalendarProvider>
    </div>
  );
};

export default App;
