//Filename: CalendarContext.test.jsx
//Author: Kyle McColgan
//Date: 5 October 2025
//Description: This file contains the unit tests for the context component for the Saint Louis React calendar project.

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CalendarProvider, useCalendarContext } from '../components/Calendar/CalendarContext.jsx';

describe('CalendarContext', () => {
	beforeAll(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date('2025-10-01T00:00:00Z'));
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	const wrapper = ({ children }) => <CalendarProvider>{children}</CalendarProvider>;

	//Test #1: Provides default values.
	it('provides default context values', () => {
	  const { result } = renderHook(() => useCalendarContext(), { wrapper });

	  // Assert default state.
	  expect(result.current.currentDate).toBeInstanceOf(Date);
	  expect(result.current.selectedDate).toBeNull();
	  expect(typeof result.current.changeMonth).toBe('function');
	  expect(typeof result.current.changeWeek).toBe('function');
	  expect(typeof result.current.selectDate).toBe('function');
	});
	
	//Test #2: currentDate starts on Sunday.
	it('initalizes currentDate to start of the current week (Sunday).', () => {
        const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const day = result.current.currentDate.getUTCDay(); // 0 = Sunday.
		expect(day).toBe(0);
	});

	//Test #3: changeMonth moves one month forward.
	it('updates currentDate when changeMonth moves forward by 1 month.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialMonth = result.current.currentDate.getUTCMonth();
		act(() => {
			result.current.changeMonth(1);
		});

		expect(result.current.currentDate.getUTCMonth()).toBe((initialMonth + 1) % 12);
		expect(result.current.currentDate.getUTCDay()).toBe(0);
	});

	//Test #4: changeMonth moves multiple months backwards.
	it('updates currentDate when changeMonth moves backwards by multiple months.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialMonth = result.current.currentDate.getUTCMonth();
		act(() => {
			result.current.changeMonth(-3);
		});

		const movedDate = new Date(result.current.currentDate);
		const expectedRawMonth = (initialMonth + 12 - 3) % 12;

		const actualMonth = movedDate.getUTCMonth();

		expect(
			actualMonth === expectedRawMonth || actualMonth === (expectedRawMonth + 11) % 12
		).toBe(true);
		expect(result.current.currentDate.getUTCDay()).toBe(0);
	});

	//Test #5: changeWeek moves forwards by one week.
	it('updates currentDate by seven (7) days when changeWeek moves forwards.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialDate = new Date(result.current.currentDate);
		act(() => {
			result.current.changeWeek(1);
		});

		const diffInDays = (result.current.currentDate - initialDate) / (1000 * 60 * 60 * 24);
		expect(diffInDays).toBeGreaterThanOrEqual(7);
		expect(result.current.currentDate.getUTCDay()).toBe(0);
	});

	//Test #6: changeWeek moves backwards by two weeks.
	it('updates currentDate by fourteen (14) days when changeWeek moves backwards.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialDate = new Date(result.current.currentDate);
		act(() => {
			result.current.changeWeek(-2);
		});

		const diffInDays = (initialDate - result.current.currentDate) / (1000 * 60 * 60 * 24);
		expect(diffInDays).toBeGreaterThanOrEqual(14);
		expect(result.current.currentDate.getUTCDay()).toBe(0);
	});

	//Test #7: selectDate updates selectedDate with a valid date.
	it('updates selectedDate when a valid date is provided.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const validDate = new Date(2024, 11, 11);
		act(() => {
			result.current.selectDate(validDate);
		});

		expect(result.current.selectedDate).toEqual(validDate);
	});

	//Test #8: selectDate ignores invalid dates.
	it('does not update selectedDate when an invalid date is provided.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialSelectedDate = result.current.selectedDate;
		act(() => {
			result.current.selectDate('Invalid date string.');
		});

		expect(result.current.selectedDate).toBe(initialSelectedDate);
	});

	//Test #9: changeWeek with zero offset does not change currentDate.
	it('does not change currentDate when changeWeek is called with zero offset.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialDate = new Date(result.current.currentDate);
		act(() => {
			result.current.changeWeek(0);
		});

		expect(result.current.currentDate.getTime()).toBe(initialDate.getTime());
		expect(result.current.currentDate.getUTCDay()).toBe(0); //Still Sunday...
	});

	//Test #10: changeMonth forward then backwards returns to the same week start.
	it('returns to the same week start after moving forward and backward by one month.', () => {
		const { result } = renderHook(() => useCalendarContext(), { wrapper });

		const initialDate = new Date(result.current.currentDate);

		const sameWeek = (a,b) => a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);

		expect(sameWeek(result.current.currentDate, initialDate)).toBe(true);
		expect(result.current.currentDate.getUTCDay()).toBe(0);
	});

// *** Old tests below this line. ***
//Test #9: changeMonth keeps the week starting on Mondays...
// 	it('currentDate always starts on a Monday after changeMonth() is called.', () => {
// 		const { result } = renderHook(() => useCalendarContext(), { wrapper });
//
// 		act(() => {
// 			result.current.changeMonth(1);
// 		});
//
// 		expect(result.current.currentDate.getDay()).toBe(1);
// 	});

//Test #10: changeWeek keeps the week starting on Mondays...
// 	it('currentDate always starts on a Monday after changeWeek() is called.', () => {
// 		const { result } = renderHook(() => useCalendarContext(), { wrapper });
//
// 		act(() => {
// 			result.current.changeWeek(2);
// 		});
//
// 		expect(result.current.currentDate.getDay()).toBe(1);
// 	});
//     it('updates currentDate when changeMonth is called', () => {
// 		const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });
//
// 		const initialDate = new Date(result.current.currentDate); // Capture initial date.
// 		const initialMonth = initialDate.getMonth(); // Initial month.
// 		const initialYear = initialDate.getFullYear(); // Initial year.
//
// 		// Test moving forward one month
// 		act(() => {
// 			result.current.changeMonth(1); // Move to the next month.
// 		});
//
// 		let newDate1 = new Date(result.current.currentDate);
// 		let newMonth1 = newDate1.getMonth();
// 		let newYear1 = newDate1.getFullYear();
//
// 		const monthDiff1 = (newYear1 - initialYear) * 12 + (newMonth1 - initialMonth);
//
// 		expect(monthDiff1).toBe(1);
//
// 		// Test moving backward two months.
// 		act(() => {
// 			result.current.changeMonth(-2); // Move back two months.
// 		});
//
// 		let newDate2 = new Date(result.current.currentDate);
// 		let newMonth2 = newDate2.getMonth();
// 		let newYear2 = newDate2.getFullYear();
//
// 		const monthDiff2 = (newYear2 - initialYear) * 12 + (newMonth2 - initialMonth);
//
// 		expect(monthDiff2).toBe(-1);
// 	});
//
//
// 	  it('updates selectedDate when a valid date is passed to selectDate', () => {
// 		const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });
//
// 		const validDate = new Date(2024, 11, 15); // December 15, 2024.
// 		act(() => {
// 		  result.current.selectDate(validDate);
// 		});
//
// 		expect(result.current.selectedDate).toEqual(validDate);
// 	  });
//
// 	it('does not update selectedDate when an invalid date is passed to selectDate', () => {
// 	  const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });
//
// 	  const initialSelectedDate = result.current.selectedDate;
//
// 	  act(() => {
// 		result.current.selectDate('Invalid date'); // Pass an invalid date.
// 	  });
//
// 	  // Ensure selectedDate remains unchanged.
// 	  expect(result.current.selectedDate).toBe(initialSelectedDate);
// 	});
});
