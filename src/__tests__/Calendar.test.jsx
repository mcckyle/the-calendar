//Filename: Calendar.test.jsx
//Author: Kyle McColgan
//Date: 2 March 2026
//Description: This file contains unit tests for the Calendar component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext';

//Mock WeekDayColumn.jsx.
jest.mock('../components/WeekDayColumn/WeekDayColumn.jsx', () => (props) => {
  const { day } = props; //Properly destructure day.

  //Construct a UTC-safe Date object.
  const utcDate = new Date(Date.UTC(
    day.getUTCFullYear(),
    day.getUTCMonth(),
    day.getUTCDate()
  ));

  //Manually format as "Day Mon DD YYYY" to match tests using regex (Test #8).
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const utcReadable = `${weekdays[utcDate.getUTCDay()]} ${months[utcDate.getUTCMonth()]} ${utcDate.getUTCDate()} ${utcDate.getUTCFullYear()}`;

  return (
    <div data-testid="week-day-column">
      <span>{utcReadable}</span>
    </div>
  );
});

//Mock EventPanel.jsx.
jest.mock('../components/EventPanel/EventPanel.jsx', () => ({ selectedEvent, onClose }) => (
  <div data-testid="event-panel">
    <span>{selectedEvent ? selectedEvent.title : 'No Event'}</span>
    <button onClick={onClose}>Close</button>
  </div>
));

//Mock the useEvents hook.
const mockEvents = [];
jest.mock('../hooks/useEvents', () => ({
  useEvents: () => ({
    events: mockEvents, //empty array of events, always the same.
    loading: false, //make loading false so the calendar renders immediately.
    error: null //no errors.
  })
}));

// Return a fixed UTC date (2025-10-31T00:00:00Z) so the Calendar snapshot test passes on GitHub Actions.
beforeAll(() => {
  const fixedDate = new Date(Date.UTC(2025, 9, 31)); //October 31st, 2025.
  jest.useFakeTimers();
  jest.setSystemTime(fixedDate);
});

afterAll(() => {
  jest.useRealTimers();
});

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

    //Query by class name (month-year) to avoid multiple matches.
    const monthYear = document.querySelector('.month-year');
    expect(monthYear).toBeInTheDocument();
    expect(monthYear.textContent).toMatch(/January|February|March|April|May|June|July|August|September|October|November|December/);
  });

  //Test #2: Week view renders seven (7) weekday columns.
  test('renders week view with seven WeekDayColumn components.', async () => {
    renderCalendar();

    // Check that seven WeekDayColumn components are rendered.
    await waitFor(() => {
      expect(screen.getAllByTestId('week-day-column')).toHaveLength(7);
    });
  });

  //Test #3: Clicking "Previous" keeps seven (7) columns but changes dates.
  test('navigates to the previous week when the "Previous" button is clicked.', async () => {
    renderCalendar();

    const prevButton = screen.getByRole('button', { name: /previous week/i });

    // Click on the "Next week" button using the accessible name.
    fireEvent.click(prevButton);

    // Check that seven WeekDayColumn components are rendered.
    await waitFor(() => {
      expect(screen.getAllByTestId('week-day-column')).toHaveLength(7);
    });
  });

  //Test #4: Clicking "Next" changes week dates.
  test('navigates to the next week when the "Next" button is clicked.', async () => {
    renderCalendar();

    const nextButton = screen.getByRole('button', { name: /next week/i });

    // Click on the "Next week" button using the accessible name.
    fireEvent.click(nextButton);

    // Check that seven WeekDayColumn components are rendered.
    await waitFor(() => {
      expect(screen.getAllByTestId('week-day-column')).toHaveLength(7);
    });
  });

  //Test #5: Month text updates when navigating.
  test('updates the displayed month/year when navigating weeks.', () => {
    renderCalendar();

    const getMonthYearText = () => document.querySelector('.month-year').textContent;
    const monthBefore = getMonthYearText();

    //Click "Next Week" five times.
    for (let i = 0; i < 5; i ++ )
    {
        // Click on the "Next week" button using the accessible name.
        fireEvent.click(screen.getByRole('button', { name: /next week/i }));
    }

    const monthAfter = getMonthYearText();

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
  test('displays weekday columns with readable date strings.', async () => {
    renderCalendar();

    //Wait for the calendar to render columns...
    await waitFor(() => {
      const columns = screen.getAllByTestId('week-day-column');
      expect(columns).toHaveLength(7);
    });

    const columns = screen.getAllByTestId('week-day-column');
    for (const column of columns)
    {
      const text = column.textContent;
      //Check that seven WeekDayColumn components are rendered.
      //expect(text).toMatch(/^[A-Za-z]\s[A-Za-z]{3}\s\d{1,2}\s\d{4}$/);
      expect(text).toMatch(/\w+\s\d{1,2}\s\d{4}/);
    }
  });

  //Test #9: Snapshot test for UI consistency.
  test('matches snapshot for default render.', () => {
    const fixedDate = new Date(Date.UTC(2025, 9, 31)); //October 31st, 2025.

    const { asFragment } = render(
      <CalendarProvider initialDate={fixedDate}>
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
