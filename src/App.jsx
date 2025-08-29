//Filename: App.jsx
//Author: Kyle McColgan
//Date: 27 August 2025
//Description: This file contains the main parent component for the local Saint Louis React calendar project.

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
        <Calendar hours={hours} />
      </CalendarProvider>
    </div>
  );
};

export default App;
