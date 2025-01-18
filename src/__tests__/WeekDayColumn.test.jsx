import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeekDayColumn from '../components/Calendar/WeekDayColumn.jsx';

// Mock the TimeSlot component
jest.mock('../components/Calendar/TimeSlot', () => ({ hour, label, events, onEventClick }) => (
  <div data-testid="time-slot">
    <span>{label}</span>
    <button onClick={() => onEventClick(events)}>Click Event</button>
  </div>
));

describe('WeekDayColumn', () => {
  const mockDay = new Date(2025, 0, 15); // Example date: January 15, 2025
  const mockGroupedEvents = {
    8: [{ id: 1, title: 'Morning Event' }],
    12: [{ id: 2, title: 'Lunch Event' }],
  };
  const mockOnEventClick = jest.fn();
  const mockConvertTo12HourFormat = jest.fn((time) => `${time} AM/PM`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the day header with the correct date', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    // Assert the day header renders the correct date
    expect(screen.getByText(mockDay.toDateString())).toBeInTheDocument();
  });

  test('renders time slots for all hours from 8 AM to 11 PM', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    // Assert that 24 time slots are rendered (one for each hour)
    const timeSlots = screen.getAllByTestId('time-slot');
    expect(timeSlots).toHaveLength(24);
  });

  test('calls convertTo12HourFormat for each hour label', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    // Assert convertTo12HourFormat was called 24 times
    expect(mockConvertTo12HourFormat).toHaveBeenCalledTimes(24);

    // Check if convertTo12HourFormat was called with specific hours
    expect(mockConvertTo12HourFormat).toHaveBeenCalledWith('8:00');
    expect(mockConvertTo12HourFormat).toHaveBeenCalledWith('12:00');
    expect(mockConvertTo12HourFormat).toHaveBeenCalledWith('23:00');
  });

  test('passes events and calls onEventClick when an event is clicked', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    // Find a specific time slot and click the event button
    const eventButton = screen.getAllByText('Click Event')[0];
    fireEvent.click(eventButton);

    // Assert onEventClick was called with the correct events
    expect(mockOnEventClick).toHaveBeenCalledWith(mockGroupedEvents[8]);
  });
});