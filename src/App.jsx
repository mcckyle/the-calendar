//Filename: App.jsx
//Author: Kyle McColgan
//Date: 11 September 2025
//Description: This file contains the parent component for the Saint Louis calendar project.

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
        <main className="calendar-container" aria-label="Saint Louis Event Calendar">
          <header className="app-calendar-header">
            <h1 className="app-calendar-title">Saint Louis Calendar</h1>
            <p className="app-calendar-subtitle">
              Discover upcoming events across Saint Louis.
            </p>
          </header>
          <Calendar hours={hours} />
        </main>
      </CalendarProvider>
    </div>
  );
};

export default App;
