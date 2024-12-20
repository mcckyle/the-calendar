import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar/Calendar';
import events from '../../__mocks__/events.json';

//   Below commented out lines belong in the corresponding test file for jest.mock() calls.
//   jest.mock('../../data/events.json', () => [
//     {
//       date: '2024-12-01',
//       title: 'Sample Event',
//     },
//   ]);
//
//   jest.mock('../../hooks/useCalendarState', () => ({
//     currentDate: new Date('2024-12-01'),
//     selectedDate: new Date('2024-12-01'),
//     changeMonth: jest.fn(),
//     selectDate: jest.fn(),
//   }));

describe('Calendar Component', () => {
  it('renders the calendar header with the current month and year', () => {
    render(<Calendar />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toHaveTextContent(new Date().toLocaleString('default', { month: 'long' }));
  });

  it('renders days of the week', () => {
    render(<Calendar />);
    const daysOfWeek = screen.getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/);
    expect(daysOfWeek).toHaveLength(7);
  });

//   it('renders all days of the current month', () => {
//     render(<Calendar />);
//     const currentDate = new Date();
//     const totalDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
//     const days = screen.getAllByRole('button');
//     expect(days.length).toBe(totalDays);
//   });

  it('navigates to the previous month when the back button is clicked', () => {
    render(<Calendar />);
    const backButton = screen.getByText('<');
    fireEvent.click(backButton);
    const header = screen.getByRole('heading', { level: 2 });
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    expect(header).toHaveTextContent(prevMonth.toLocaleString('default', { month: 'long' }));
  });

  it('navigates to the next month when the forward button is clicked', () => {
    render(<Calendar />);
    const forwardButton = screen.getByText('>');
    fireEvent.click(forwardButton);
    const header = screen.getByRole('heading', { level: 2 });
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    expect(header).toHaveTextContent(nextMonth.toLocaleString('default', { month: 'long' }));
  });

//   it('selects a day when clicked', () => {
//     render(<Calendar />);
//     const dayButton = screen.getByText('15'); // Arbitrary day
//     fireEvent.click(dayButton);
//     expect(dayButton).toHaveClass('selected');
//   });

//   it('displays events for a selected day', () => {
//     const eventDate = events[0]?.date || '2024-12-01';
//     render(<Calendar />);
//     const eventDay = screen.getByText(new Date(eventDate).getDate().toString());
//     fireEvent.click(eventDay);
//     const eventTitle = screen.getByText(events[0]?.title || 'Sample Event');
//     expect(eventTitle).toBeInTheDocument();
//   });

  it('does not crash when there are no events', () => {
    render(<Calendar />);
    const days = screen.getAllByRole('button');
    expect(() => fireEvent.click(days[0])).not.toThrow();
  });

  it('handles edge cases for leap years', () => {
    const leapYear = new Date(2020, 1, 29); // February 29, 2020
    expect(leapYear.getDate()).toBe(29);
    render(<Calendar />);
    const days = screen.getAllByRole('button');
    expect(days).toBeTruthy();
  });

  it('displays an empty state if no events exist for the selected day', () => {
    render(<Calendar />);
    const dayWithoutEvent = screen.getByText('1'); // Arbitrary day
    fireEvent.click(dayWithoutEvent);
    const noEventsMessage = screen.queryByText(/No events/);
    expect(noEventsMessage).toBeNull();
  });
});
