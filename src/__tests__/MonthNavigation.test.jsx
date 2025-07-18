//Filename: MonthNavigation.test.jsx
//Author: Kyle McColgan
//Date: 17 July 2025
//Description: This file contains unit tests for the MonthNavigation.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthNavigation from '../components/MonthNavigation/MonthNavigation';
import { useCalendarContext } from '../components/Calendar/CalendarContext';

// Mock CalendarContext.jsx.
jest.mock('../components/Calendar/CalendarContext', () => ({
  useCalendarContext: jest.fn(),
}));

describe('MonthNavigation Component', () => {
	const mockChangeWeek = jest.fn();
	const mockCurrentDate = new Date('2024-11-01T00:00:00');

	beforeEach(() => {
		jest.clearAllMocks();
		useCalendarContext.mockReturnValue({
			currentDate: mockCurrentDate,
			changeWeek: mockChangeWeek,
		});
	});

	//Test #1: Renders without crashing.
	it('renders the MonthNavigation component without errors.', () => {
		render(<MonthNavigation />);
		expect(screen.getByRole('navigation', { name: /month navigation/i })).toBeInTheDocument();
	});

	//Test #2: Displays the correct month and year.
	it('displays the correct month and year based on currentDate.', () => {
		render(<MonthNavigation />);
		expect(screen.getByText('November')).toBeInTheDocument();
		expect(screen.getByText('2024')).toBeInTheDocument();
	});

	//Test #3: Previous button calls changeWeek with -1.
	it('calls changeWeek(-1) when the Previous week button is clicked.', () => {
	  render(<MonthNavigation />);

	  // Simulate click on previous week button.
	  fireEvent.click(screen.getByLabelText('Previous week'));

	  // Check if changeWeek is called with -1.
	  expect(mockChangeWeek).toHaveBeenCalledWith(-1);
	});

	//Test #4: Next button calls changeWeek with 1.
	it('calls changeWeek(1) when the Next button is clicked.', () => {
		render(<MonthNavigation />);

		// Simulate click on next week button.
		fireEvent.click(screen.getByLabelText('Next week'));

		// Check if changeWeek is called with 1.
		expect(mockChangeWeek).toHaveBeenCalledWith(1);
	});

	//Test #5: Both navigation buttons are visible and have correct classes.
	it('renders both Previous and Next buttons with correct classes.', () => {
		render(<MonthNavigation />);

		const prevButton = screen.getByLabelText('Previous week');
		const nextButton = screen.getByLabelText('Next week');

		expect(prevButton).toHaveClass('prev-button');
		expect(nextButton).toHaveClass('next-button');
	});

	//Test #6: Aria attributes for accessibility are present.
	it('component has proper aria-label on nav and aria-live on month-year.', () => {
		render(<MonthNavigation />);

		const nav = screen.getByRole('navigation', { name: /month navigation/i });
		const monthYearDiv = document.querySelector('.month-year');

		expect(nav).toHaveAttribute('aria-label', 'Month navigation');
		expect(monthYearDiv).toHaveAttribute('aria-live', 'polite');
	});

	//Test #7: Buttons contain visible arrow symbols.
	it('shows arrow symbols (← and →) inside the button.', () => {
		render(<MonthNavigation />);

		expect(screen.getByText('←')).toBeInTheDocument();
		expect(screen.getByText('→')).toBeInTheDocument();
	});

	//Test #8: Renders the correct month text dynamically.
	it('updates the displayed month when currentDate changes.', () => {
		useCalendarContext.mockReturnValueOnce({
			currentDate: new Date('2025-01-15'),
			changeWeek: mockChangeWeek,
		});

		render(<MonthNavigation />);
		expect(screen.getByText('January')).toBeInTheDocument();
	});

	//Test #9: Renders the correct year dynamically.
	it('updates the displayed year when currentDate changes.', () => {
		useCalendarContext.mockReturnValueOnce({
			currentDate: new Date('2026-07-10'),
			changeWeek: mockChangeWeek,
		});

		render(<MonthNavigation />);
		expect(screen.getByText('2026')).toBeInTheDocument();
	});

	//Test #10: No unnecessary re-renders on click (state change triggers only function).
	it('does not render month text incorrectly after click.', () => {
		render(<MonthNavigation />);
		fireEvent.click(screen.getByLabelText('Next week'));
		expect(screen.getByText('November')).toBeInTheDocument(); // Month stays the same until context updates.
	});

    // *** OLD TESTS COMMENTED OUT BELOW THIS LINE. ***
// 	it('renders the current month and year correctly', () => {
// 		const mockCurrentDate = new Date('2024-11-01');
//
// 		useCalendarContext.mockReturnValue({
// 			currentDate: mockCurrentDate,
// 			changeMonth: jest.fn(),
// 		});
//
// 		render(<MonthNavigation />);
//
// 		// Check if the current month and year are displayed correctly
// 		expect(screen.getByText('November')).toBeInTheDocument();
// 		expect(screen.getByText('2024')).toBeInTheDocument();
// 	});


});
