//Filename: MonthNavigation.test.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains unit tests for the MonthNavigation.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthNavigation from '../components/MonthNavigation/MonthNavigation';
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

	it('calls changeWeek with -1 when previous week button is clicked', () => {
	  const mockChangeWeek = jest.fn(); // Mock changeWeek instead of changeMonth
	  const mockCurrentDate = new Date('2024-11-01');

	  // Mock the useCalendarContext hook to return the mock currentDate and changeWeek
	  useCalendarContext.mockReturnValue({
		currentDate: mockCurrentDate,
		changeWeek: mockChangeWeek,
	  });

	  render(<MonthNavigation />);

	  // Simulate click on previous week button
	  fireEvent.click(screen.getByLabelText('Previous week')); // Note the aria-label

	  // Check if changeWeek is called with -1
	  expect(mockChangeWeek).toHaveBeenCalledWith(-1);
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
