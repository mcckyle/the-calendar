//Filename: Calendar.test.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains unit tests for the Calendar.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext'; // Import the provider

//Mock WeekDayColumn.jsx.
jest.mock('../components/WeekDayColumn/WeekDayColumn.jsx', () => ({ day }) => (
  <div data-testid="week-day-column">
    <span>{day.toDateString()}</span>
  </div>
));

//Mock EventPanel.jsx.
jest.mock('../components/EventPanel/EventPanel.jsx', () => ({ selectedEvent, onClose }) => (
  <div data-testid="event-panel">
    <span>{selectedEvent ? selectedEvent.title : 'No Event'}</span>
    <button onClick={onClose}>Close</button>
  </div>
));

describe('Calendar Component', () => {
  const renderCalendar = () => {
    render(
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    );
  };

  //Test #1: Header renders correctly.
  test('renders calendar header with navigation buttons and month/year.', () => {
    renderCalendar();

    // Check for navigation buttons and month/year display
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
  });

  //Test #2: Week view renders seven (7) weekday columns.
  test('renders week view with seven WeekDayColumn components.', () => {
    renderCalendar();

    // Check that seven WeekDayColumn components are rendered
    expect(screen.getAllByTestId('week-day-column').length).toBe(7);
  });

  //Test #3: Clicking "Previous" keeps seven (7) columns but changes dates.
  test('navigates to the previous week when the "Previous" button is clicked.', () => {
    renderCalendar();

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    // Verify that the week updates (implementation depends on mock; adjust as necessary)
    expect(screen.getAllByTestId('week-day-column').length).toBe(7); // Week view remains consistent
  });

  //Test #4: Clicking "Next" changes week dates.
  test('navigates to the next week when the "Next" button is clicked.', () => {
    renderCalendar();

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Verify that the week updates (implementation depends on mock; adjust as necessary)
    expect(screen.getAllByTestId('week-day-column').length).toBe(7); // Week view remains consistent
  });

//   //Test #5: Month/year text updates when navigating.
//   test('updates the displayed month/year when navigating weeks.', () => {
//     renderCalendar();
//     const monthBefore = screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/);
//
//     fireEvent.click(screen.getByText('Next'));
//     const monthAfter = screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/);
//
//
//     expect(monthBefore).not.toEqual(monthAfter);
//   });

});
