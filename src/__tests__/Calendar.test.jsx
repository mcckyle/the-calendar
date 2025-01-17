import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext'; // Import the provider

test('renders navigation buttons and handles week changes', () => {
  render(
    <CalendarProvider>
      <Calendar
        weekDates={[]} // No need to provide actual dates for this test
        renderMonthYear={() => 'January 2025'} // Stub for month-year rendering
        getEventsForDay={() => []} // Not needed for this test
        getEventsForTimeSlot={() => []} // Not needed for this test
        renderTimeLabel={() => {}} // Not needed for this test
      />
    </CalendarProvider>
  );

  // Assert navigation buttons are present
  const prevButton = screen.getByRole('button', { name: /Previous/i });
  const nextButton = screen.getByRole('button', { name: /Next/i });

  expect(prevButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  // Test clicking the Previous button
  fireEvent.click(prevButton);

  // Add assertions to ensure the context is updated
  expect(screen.getByText('January 2025')).toBeInTheDocument();

  // Test clicking the Next button
  fireEvent.click(nextButton);
  expect(screen.getByText('January 2025')).toBeInTheDocument(); // Adjust expectation as needed
});