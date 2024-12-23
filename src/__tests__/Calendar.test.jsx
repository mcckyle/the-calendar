import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { useDayClick } from '../components/Calendar/useDayClick';
import { CalendarContext } from '../components/Calendar/CalendarContext.jsx';

test('renders Calendar component and handles user interactions', () => {
  // Mock context values and functions
  const mockChangeMonth = jest.fn();
  const mockSelectDate = jest.fn();
  const mockContext = {
    currentDate: new Date(2024, 11, 1), // December 1, 2024
    selectedDate: null,
    changeMonth: mockChangeMonth,
    selectDate: mockSelectDate,
  };

  render(
    <CalendarContext.Provider value={mockContext}>
      <Calendar />
    </CalendarContext.Provider>
  );

  // Verify Calendar sub-components render
  expect(screen.getByText(/Sun/i)).toBeInTheDocument();
  expect(screen.getByText(/Sat/i)).toBeInTheDocument();

  // Verify month navigation renders
  expect(screen.getByRole('button', { name: /Previous month/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Next month/i })).toBeInTheDocument();
  expect(screen.getByText(/December/i)).toBeInTheDocument();

  // Test "Previous month" button click
  fireEvent.click(screen.getByRole('button', { name: /Previous month/i }));
  expect(mockChangeMonth).toHaveBeenCalledWith(-1);

  // Test "Next month" button click
  fireEvent.click(screen.getByRole('button', { name: /Next month/i }));
  expect(mockChangeMonth).toHaveBeenCalledWith(1);
});
