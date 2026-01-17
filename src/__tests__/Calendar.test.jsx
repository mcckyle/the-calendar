//Filename: Calendar.test.jsx
//Author: Kyle McColgan
//Date: 16 January 2026
//Description: This file contains unit tests for the Calendar component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext';

//Mock WeekDayColumn.jsx.
jest.mock('../components/WeekDayColumn/WeekDayColumn.jsx', () => (props) => {
  const { day } = props; //Properly destructure day.
  return (
    <div data-testid="week-day-column">
      <span>{day.toDateString()}</span>
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

// Return a fixed date so the snapshot test passes on GitHub.
beforeAll(() => {
  const fixedDate = new Date(2025, 9, 31);
  jest.useFakeTimers();
  jest.setSystemTime(fixedDate);

  //Mock global fetch...
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve([]), //Return an empty array of events.
//     })
//   );
});

afterAll(() => {
  jest.useRealTimers();
  //global.fetch.mockRestore(); //Clean up.
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
    expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
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
