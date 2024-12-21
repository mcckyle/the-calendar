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
    currentDate: new Date(2024, 11, 1), // Example: December 1, 2024
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

  // Verify month navigation renders
  expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument(); // Assuming button text has "prev"
  expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument(); // Assuming button text has "next"

  // Test "previous month" button click
  fireEvent.click(screen.getByRole('button', { name: /prev/i }));
  expect(mockChangeMonth).toHaveBeenCalledWith(-1);

  // Test "next month" button click
  fireEvent.click(screen.getByRole('button', { name: /next/i }));
  expect(mockChangeMonth).toHaveBeenCalledWith(1);

  // Test day selection
  const dayElement = screen.getByText('15'); // Assuming "15" is a day in the calendar
  fireEvent.click(dayElement);
  expect(mockSelectDate).toHaveBeenCalledWith(15);
});
