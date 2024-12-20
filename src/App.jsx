import React from 'react';
import { CalendarProvider } from './components/Calendar/CalendarContext';
import Calendar from './components/Calendar/Calendar';
import './App.css'

const App = () => {
  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
};

export default App;
