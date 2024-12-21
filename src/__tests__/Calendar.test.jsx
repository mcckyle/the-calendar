import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarContext } from '../components/Calendar/CalendarContext.jsx';

test('renders Calendar component and responds to user actions', () => {
  // Mock context values and functions
  const mockChangeMonth = jest.fn();
  const mockSelectDate = jest.fn();
  const mockContext = {
    currentDate: new Date(2024, 11, 1), // December 1, 2024 (month is 0-indexed, so 11 represents December)
    selectedDate: null,
    changeMonth: mockChangeMonth,
    selectDate: mockSelectDate,
  };

  // Render Calendar component with mocked context
  render(
    <CalendarContext.Provider value={mockContext}>
      <Calendar />
    </CalendarContext.Provider>
  );

  // Verify Calendar sub-components render
  expect(screen.getByText(/Sun/i)).toBeInTheDocument(); // Days of the week
  expect(screen.getByText(/Mon/i)).toBeInTheDocument();
  expect(screen.getByText(/Sat/i)).toBeInTheDocument();

  // Verify month navigation renders and displays the correct month
  expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument(); // "Previous month" button
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument(); // "Next month" button
  expect(screen.getByText(/December/i)).toBeInTheDocument(); // Ensure the correct month (December) is displayed

  // Test "previous month" button click
  fireEvent.click(screen.getByRole('button', { name: /prev/i }));
  expect(mockChangeMonth).toHaveBeenCalledWith(-1); // Ensure that the function is called with the expected argument

  // Test "next month" button click
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(mockChangeMonth).toHaveBeenCalledWith(1); // Ensure that the function is called with the expected argument

  // Test day selection (assuming 15 is a valid day in the rendered calendar grid)
//   const dayElement = screen.getByText('2024-12-15T06:00:00.000Z'); // Look for the day "15" in the calendar grid
//   fireEvent.click(dayElement);
//   expect(mockSelectDate).toHaveBeenCalledWith(15); // Ensure that the correct day is passed to selectDate function

  // Optionally, test for event markers (if relevant)
  const eventMarker = screen.queryByText(/event/i); // Look for event markers on the calendar (adjust for your actual event text)
  expect(eventMarker).toBeInTheDocument(); // Verify that event markers are displayed if applicable
});
