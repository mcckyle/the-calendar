import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Days from '../components/Calendar/Days';

const mockDate = new Date(2024, 10, 1); // November 2024
const mockSelectedDate = new Date(2024, 10, 5); // Selected date: November 5, 2024
const mockOnDayClick = jest.fn();
const mockEvents = [
  { date: '2024-11-03', title: 'Event 1' },
  { date: '2024-11-03', title: 'Event 2' },
  { date: '2024-11-15', title: 'Event 3' },
];

describe('Days Component', () => {
  it('renders the correct number of days in the current month', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check for the correct number of days
    const days = screen.getAllByText(/^\d+$/); // Matches only numeric day elements
    expect(days).toHaveLength(30); // November has 30 days
  });

    it('renders the correct number of empty days at the start of the month', () => {
    render(
        <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
        />
    );

    // Select empty day elements by their "empty" class
    const emptyDays = document.querySelectorAll('.calendar-day.empty');
    expect(emptyDays).toHaveLength(5); // November 1, 2024, is a Friday, so 5 empty days
    });

  it('handles day clicks and passes the correct day to the callback', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Click on the 10th day
    fireEvent.click(screen.getByText('10'));
    expect(mockOnDayClick).toHaveBeenCalledWith(10);
  });

  it('highlights the selected day', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check that the selected day has the correct class
    const selectedDay = screen.getByText('5'); // Selected date is November 5
    expect(selectedDay).toHaveClass('selected');
  });

  it('displays the correct number of events for a day', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check that November 3 shows 2 events
    const eventMarker = screen.getByText('2 Event(s)');
    expect(eventMarker).toBeInTheDocument();

    // Check that November 15 shows 1 event
    const singleEventMarker = screen.getByText('1 Event(s)');
    expect(singleEventMarker).toBeInTheDocument();
  });

  it('does not display events for days with no events', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check that November 10 does not have an event marker
    const dayWithoutEvents = screen.getByText('10');
    expect(dayWithoutEvents).not.toContainHTML('<div class="event-marker">');
  });
});
