//Filename: CalendarContext.test.jsx
//Author: Kyle McColgan
//Date: 13 July 2025
//Description: This file contains Jest unit test suite for the CalendarContext.jsx for the local Saint Louis React calendar project.

import { renderHook, act } from '@testing-library/react';
import { CalendarProvider, useCalendarContext } from '../components/Calendar/CalendarContext.jsx';

describe('CalendarContext', () => {
	it('provides default context values', () => {
	  const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });

	  // Assert default state
	  expect(result.current.currentDate).toBeInstanceOf(Date);
	  expect(result.current.selectedDate).toBeNull(); // Ensure selectedDate is null
	  expect(typeof result.current.changeMonth).toBe('function');
	  expect(typeof result.current.selectDate).toBe('function'); // Ensure selectDate is a function
	});
	
    //The below test is currently not passing...
    it('updates currentDate when changeMonth is called', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });

		const initialDate = new Date(result.current.currentDate); // Capture initial date
		const initialMonth = initialDate.getMonth(); // Initial month
		const initialYear = initialDate.getFullYear(); // Initial year

		// Test moving forward one month
		act(() => {
			result.current.changeMonth(1); // Move to the next month
		});

		let newDate1 = new Date(result.current.currentDate); // Updated date
		let newMonth1 = newDate1.getMonth();
		let newYear1 = newDate1.getFullYear();
		
		const monthDiff1 = (newYear1 - initialYear) * 12 + (newMonth1 - initialMonth);
		
		expect(monthDiff1).toBe(1);

		// Test moving backward two months.
		act(() => {
			result.current.changeMonth(-2); // Move back two months
		});

		let newDate2 = new Date(result.current.currentDate); // Updated date
		let newMonth2 = newDate2.getMonth();
		let newYear2 = newDate2.getFullYear();
		
		const monthDiff2 = (newYear2 - initialYear) * 12 + (newMonth2 - initialMonth);
		
		expect(monthDiff2).toBe(-1);
	});


	  it('updates selectedDate when a valid date is passed to selectDate', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });

		const validDate = new Date(2024, 11, 15); // December 15, 2024
		act(() => {
		  result.current.selectDate(validDate);
		});

		expect(result.current.selectedDate).toEqual(validDate);
	  });

	it('does not update selectedDate when an invalid date is passed to selectDate', () => {
	  const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });

	  const initialSelectedDate = result.current.selectedDate;

	  act(() => {
		result.current.selectDate('Invalid date'); // Pass an invalid date
	  });

	  // Ensure selectedDate remains unchanged
	  expect(result.current.selectedDate).toBe(initialSelectedDate);
	});
});
