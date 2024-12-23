import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthNavigation from '../components/Calendar/MonthNavigation';
import { useCalendarContext } from '../components/Calendar/CalendarContext';

// Mocking the useCalendarContext hook
jest.mock('../components/Calendar/CalendarContext', () => ({
  useCalendarContext: jest.fn(),
}));

describe('MonthNavigation Component', () => {
//   it('renders the current month and year correctly', () => {
//     const mockCurrentDate = new Date('2024-11-01');
//
//     useCalendarContext.mockReturnValue({
//       currentDate: mockCurrentDate,
//       changeMonth: jest.fn(),
//     });
//
//     render(<MonthNavigation />);
//
//     // Check if the current month and year are displayed correctly
//     expect(screen.getByText('November')).toBeInTheDocument();
//     expect(screen.getByText('2024')).toBeInTheDocument();
//   });

  it('calls changeMonth with -1 when previous month button is clicked', () => {
    const mockChangeMonth = jest.fn();
    const mockCurrentDate = new Date('2024-11-01');

    useCalendarContext.mockReturnValue({
      currentDate: mockCurrentDate,
      changeMonth: mockChangeMonth,
    });

    render(<MonthNavigation />);

    // Simulate click on previous month button
    fireEvent.click(screen.getByLabelText('Previous month'));

    // Check if changeMonth is called with -1
    expect(mockChangeMonth).toHaveBeenCalledWith(-1);
  });

//   it('calls changeMonth with 1 when next month button is clicked', () => {
//     const mockChangeMonth = jest.fn();
//     const mockCurrentDate = new Date('2024-11-01');
//
//     useCalendarContext.mockReturnValue({
//       currentDate: mockCurrentDate,
//       changeMonth: mockChangeMonth,
//     });
//
//     render(<MonthNavigation />);
//
//     // Simulate click on next month button
//     fireEvent.click(screen.getByLabelText('Next month'));
//
//     // Check if changeMonth is called with 1
//     expect(mockChangeMonth).toHaveBeenCalledWith(1);
//   });
});
