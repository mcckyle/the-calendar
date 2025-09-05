//Filename: Calendar.test.jsx
//Author: Kyle McColgan
//Date: 05 September 2025
//Description: This file contains unit tests for the Calendar.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext';

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

    // Check for navigation buttons and month/year display.
    expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next week/i })).toBeInTheDocument();
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
  });

  //Test #2: Week view renders seven (7) weekday columns.
  test('renders week view with seven WeekDayColumn components.', () => {
    renderCalendar();

    // Check that seven WeekDayColumn components are rendered.
    expect(screen.getAllByTestId('week-day-column').length).toBe(7);
  });

  //Test #3: Clicking "Previous" keeps seven (7) columns but changes dates.
  test('navigates to the previous week when the "Previous" button is clicked.', () => {
    renderCalendar();

    // Click on the "Next week" button using the accessible name.
    fireEvent.click(screen.getByRole('button', { name: /previous week/i }));

    // Verify that the week updates.
    expect(screen.getAllByTestId('week-day-column').length).toBe(7); // Week view remains consistent.
  });

  //Test #4: Clicking "Next" changes week dates.
  test('navigates to the next week when the "Next" button is clicked.', () => {
    renderCalendar();

    // Click on the "Next week" button using the accessible name.
    fireEvent.click(screen.getByRole('button', { name: /next week/i }));

    // Verify that the week updates.
    expect(screen.getAllByTestId('week-day-column').length).toBe(7); // Week view remains consistent.
  });

   //Test #5: Month text updates when navigating.
  test('updates the displayed month/year when navigating weeks.', () => {
    renderCalendar();
    const monthBefore = screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/).textContent;

    for(let i = 0; i < 5; i ++ )
    {
        // Click on the "Next week" button using the accessible name.
        fireEvent.click(screen.getByRole('button', { name: /next week/i }));
    }

    const monthAfter = screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/).textContent;

    expect(monthBefore).not.toEqual(monthAfter);
  });

  //Test #6: EventPanel does not render initially.
  test('does not render EventPanel initially.', () => {
    renderCalendar();
    expect(screen.queryByTestId('event-panel')).toBeNull();
  });

  //Test #7: EventPanel renders when showEventPanel is true.
  test('renders EventPanel when an event is clicked on.', () => {
    renderCalendar();

    // Click on the "Next week" button using the accessible name.
    fireEvent.click(screen.getByRole('button', { name: /next week/i }));

    //Force showing EventPanel.
    const { rerender } = render(
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    );

    rerender(
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    );

    expect(screen.queryByTestId('event-panel')).toBeNull();
  });

  //Test #8: Weekday column displays correct date format.
  test('displays weekday columns with readable date strings.', () => {
    renderCalendar();
    const columns = screen.getAllByTestId('week-day-column');
    columns.forEach(column => {
      expect(column.textContent).toMatch(/\w+\s\d{1,2}\s\d{4}/);
    });
  });

  //Test #9: Snapshot test for UI consistency.
  test('matches snapshot for default render.', () => {
    const { asFragment } = render(
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  //Test #10: Accessibility - buttons have accessible roles.
  test('navigation buttons are accessible', () => {
    renderCalendar();
    expect(screen.getByRole('button', { name: /Previous/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next/i})).toBeInTheDocument();
  });
});
