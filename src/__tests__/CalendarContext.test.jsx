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

    it('updates currentDate when changeMonth is called', () => {
    const { result } = renderHook(() => useCalendarContext(), { wrapper: CalendarProvider });

    const initialDate = new Date(result.current.currentDate); // Capture initial date
    const initialMonth = initialDate.getMonth(); // Initial month
    const initialYear = initialDate.getFullYear(); // Initial year

    // Test moving forward one month
    act(() => {
        result.current.changeMonth(1); // Move to the next month
    });

    let updatedDate = new Date(result.current.currentDate); // Updated date
    let expectedMonth = (initialMonth + 1) % 12;
    let expectedYear = initialYear + (expectedMonth < initialMonth ? 1 : 0); // Adjust year if wrapped
    expect(updatedDate.getMonth()).toBe(expectedMonth);
    expect(updatedDate.getFullYear()).toBe(expectedYear);

    // Test moving backward two months
    act(() => {
        result.current.changeMonth(-2); // Move back two months
    });

    updatedDate = new Date(result.current.currentDate); // Further updated date
    expectedMonth = (expectedMonth - 2 + 12) % 12; // Add 12 to handle negative months
    expectedYear = expectedYear - (expectedMonth > (initialMonth - 2 + 12) % 12 ? 1 : 0); // Adjust year if wrapped
    expect(updatedDate.getMonth()).toBe(expectedMonth);
    expect(updatedDate.getFullYear()).toBe(expectedYear);
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
