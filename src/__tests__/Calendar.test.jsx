import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar.jsx';
import { CalendarProvider } from '../components/Calendar/CalendarContext'; // Import the provider

test('renders Calendar component and handles user interactions', () => {
  render(
    <CalendarProvider>
      <Calendar
        hours={['8:00 AM', '9:00 AM', '10:00 AM']} // Provide hours
        navigateWeek={() => {}}
        getEventsForTimeSlot={() => []}
        renderTimeLabel={(hour) => hour}
      />
    </CalendarProvider>
  );

  // Wait for "Sun" elements to appear
  await waitFor(() => screen.getAllByText(/Sun/i));

	// Ensure there is only one "Sun" in the div with the class "calendar-day-of-week"
	expect(dayHeaders.some(el => el.className === 'calendar-day-of-week')).toBe(true);

  // Test interactions (e.g., change week buttons)
  fireEvent.click(screen.getByRole('button', { name: /Previous week/i }));
  fireEvent.click(screen.getByRole('button', { name: /Next week/i }));
});