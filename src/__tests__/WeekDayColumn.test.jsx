//Filename: WeekDayColumn.test.jsx
//Author: Kyle McColgan
//Date: 31 October 2025
//Description: This file contains unit tests for the WeekDayColumn.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import WeekDayColumn from '../components/WeekDayColumn/WeekDayColumn.jsx';

// Mock the TimeSlot component.
jest.mock('../components/TimeSlot/TimeSlot.jsx', () => ({ hour, label, events, onEventClick }) => (

  <div data-testid={`time-slot-${hour}`}>
    <span>{label}</span>
    {events.map((event, index) => (
      <button
        key={index}
        data-testid={`event-${hour}-${index}`}
        onClick={() => onEventClick(event)}
      >
        Click Event
      </button>
    ))}
  </div>
));

describe('WeekDayColumn', () => {
  const mockDay = new Date(2025, 0, 15); // Example date: January 15, 2025.

  const mockGroupedEvents = {
    9: [{ id: 1, title: 'Morning Event' }],
    12: [{ id: 2, title: 'Lunch Event' }],
  };

  const mockOnEventClick = jest.fn();
  const mockConvertTo12HourFormat = jest.fn((time) => `${time} AM/PM`);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test #1: Renders the day header with the correct date.
//   test('renders the day header with the correct date.', () => {
//     render(
//       <WeekDayColumn
//         day={mockDay}
//         groupedEvents={mockGroupedEvents}
//         onEventClick={mockOnEventClick}
//         convertTo12HourFormat={mockConvertTo12HourFormat}
//       />
//     );
//
//     // Assert the day header renders the correct date.
//     expect(screen.getByText(mockDay.toDateString())).toBeInTheDocument();
//   });

  //Test #2: Renders time slots for all hours from 9 AM to 9 PM.
  test('renders time slots for all hours from 9 AM to 9 PM.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    // Check for all 12 time slots using their unique `data-testid` attributes.
    for (let hour = 9; hour <= 21; hour++)
    {
      expect(screen.getByTestId(`time-slot-${hour}`)).toBeInTheDocument();
    }
  });

  //Test #3: Calls convertTo12HourFormat for each hour.
  test('calls convertTo12HourFormat for each generated hour.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={{}}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    expect(mockConvertTo12HourFormat).toHaveBeenCalledTimes(13); // 9 - 21 inclusive = 13 slots.
  });

  //Test #4: Passes correct label to the TimeSlot component via convertTo12HourFormat.
  test('passes the correct label to the TimeSlot component.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={{}}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    // Use ^ and $ regex anchors for exact matching to avoid partial matches like 19:00
    expect(screen.getByText(/^9:00 AM\/PM$/)).toBeInTheDocument();
    expect(screen.getByText(/^21:00 AM\/PM$/)).toBeInTheDocument();
  });

  //Test #5: Renders events inside the correct TimeSlot.
  test('renders events in the correct TimeSlot based on groupedEvents.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    expect(screen.getByTestId('event-9-0')).toBeInTheDocument(); // Morning Event.
    expect(screen.getByTestId('event-12-0')).toBeInTheDocument(); // Lunch Event.
  });

  //Test #6: Calls onEventClick when an event button is clicked on.
  test('calls onEventClick with the correct event when the button is clicked on.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    fireEvent.click(screen.getByTestId('event-9-0')); // Click on the Morning Event.
    expect(mockOnEventClick).toHaveBeenCalledWith(mockGroupedEvents[9][0]);
  });

  //Test #7: Handles case where groupedEvents is empty (renders empty TimeSlots).
  test('renders empty time slots when groupedEvents is empty.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={{}}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    for(let hour = 9; hour <= 21; hour ++)
    {
        expect(screen.getByTestId(`time-slot-${hour}`)).toBeInTheDocument();
    }
  });

  //Test #8: Handles case where groupedEvents has hours outside the 9-21 range (should ignore them).
  test('ignores events outside the 9-21 hour range.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={{ 8: [{ id: 99, title: 'Early Event' }] }} // Outside the 9-21 range.
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    expect(screen.queryByTestId('event-8-0')).not.toBeInTheDocument();
  });

  //Test #9: Section element has correct aria-label for accessibility purposes.
  test('has an aria-label describing the schedule for the given day.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={mockGroupedEvents}
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    expect(screen.getByLabelText(`Schedule for ${mockDay.toDateString()}`)).toBeInTheDocument();
  });

  //Test #10: Each TimeSlot receives events array, even when empty.
  test('each TimeSlot receives events array, even when it is empty.', () => {
    render(
      <WeekDayColumn
        day={mockDay}
        groupedEvents={{}} // No events provided.
        onEventClick={mockOnEventClick}
        convertTo12HourFormat={mockConvertTo12HourFormat}
      />
    );

    expect(screen.getAllByTestId(/time-slot-/)).toHaveLength(13);
  });
});
