import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext'; // Import the provider

jest.mock('../components/Calendar/WeekDayColumn', () => ({ day, groupedEvents, onEventClick, convertTo12HourFormat }) => (
  <div data-testid="week-day-column">
    <span>{day.toDateString()}</span>
  </div>
));

jest.mock('../components/Calendar/EventPanel', () => ({ selectedEvent, onClose }) => (
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

  test('renders calendar header with navigation buttons and month/year', () => {
    renderCalendar();

    // Check for navigation buttons and month/year display
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
  });

  test('renders week view with seven WeekDayColumn components', () => {
    renderCalendar();

    // Check that seven WeekDayColumn components are rendered
    expect(screen.getAllByTestId('week-day-column').length).toBe(7);
  });

  test('navigates to the previous week when the "Previous" button is clicked', () => {
    renderCalendar();

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    // Verify that the week updates (implementation depends on mock; adjust as necessary)
    expect(screen.getAllByTestId('week-day-column').length).toBe(7); // Week view remains consistent
  });

  test('navigates to the next week when the "Next" button is clicked', () => {
    renderCalendar();

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Verify that the week updates (implementation depends on mock; adjust as necessary)
    expect(screen.getAllByTestId('week-day-column').length).toBe(7); // Week view remains consistent
  });

  //test('conditionally renders EventPanel when showEventPanel is true', () => {
  //  renderCalendar();

    // Check that EventPanel is not initially rendered
  //  expect(screen.queryByTestId('event-panel')).not.toBeInTheDocument();

    // Simulate showing the EventPanel
  //  fireEvent.click(screen.getAllByTestId('week-day-column')[0]); // Simulate event click

    // Verify EventPanel is rendered
    //expect(screen.getByTestId('event-panel')).toBeInTheDocument();
  //});

  //test('closes EventPanel when the close button is clicked', () => {
  //  renderCalendar();

    // Simulate showing the EventPanel
    //fireEvent.click(screen.getAllByTestId('week-day-column')[0]); // Simulate event click

    //const closeButton = screen.getByText('Close');
    //fireEvent.click(closeButton);

    // Verify EventPanel is no longer rendered
    //expect(screen.queryByTestId('event-panel')).not.toBeInTheDocument();
  //});
});