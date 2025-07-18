//Filename: Days.test.jsx
//Author: Kyle McColgan
//Date: 16 July 2025
//Description: This file contains unit tests for the Days.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Days from '../components/Days/Days.jsx';

const mockDate = new Date(2024, 10, 1); // November 2024.
const mockSelectedDate = new Date(2024, 10, 5); // Selected date: November 5, 2024.
const mockOnDayClick = jest.fn();
const mockEvents = [
  { date: '2024-11-03', title: 'Event 1' },
  { date: '2024-11-03', title: 'Event 2' },
  { date: '2024-11-15', title: 'Event 3' },
];

describe('Days Component', () => {

  beforeEach(() => {
    mockOnDayClick.mockClear();
  });

  //Test #1: Correct number of days rendered.
  it('renders the correct number of days in the current month.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check for the correct number of days.
    const days = screen.getAllByText(/^\d+$/); // Matches only numeric day elements.
    expect(days).toHaveLength(30); // November has 30 days.
  });

    //Test #2: Renders correct number of empty days before the first day.
    it('renders the correct number of empty days at the start of the month.', () => {
    render(
        <Days
          currentDate={mockDate}
          selectedDate={mockSelectedDate}
          onDayClick={mockOnDayClick}
          events={mockEvents}
        />
    );

    // Select empty day elements by their "empty" class.
    const emptyDays = document.querySelectorAll('.calendar-day.empty');
    expect(emptyDays).toHaveLength(5); // November 1, 2024, is a Friday, so 5 empty days.
    });

  //Test #3: Handles day click and passes correct day to callback.
  it('handles day clicks and passes the correct day to the callback.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Click on the 10th day.
    fireEvent.click(screen.getByText('10'));
    expect(mockOnDayClick).toHaveBeenCalledWith(10);
  });

  //Test #4: Highlights the selected day.
  it('highlights the selected day.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check that the selected day has the correct class.
    const selectedDay = screen.getByText('5'); // Selected date is November 5.
    expect(selectedDay).toHaveClass('selected');
  });

  //Test #5: Displays correct number of events for a day.
  it('displays the correct number of events for a day.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check that November 3 shows 2 events
    //const eventMarker = screen.getByText('2 Event(s)');
    //expect(eventMarker).toBeInTheDocument();

    // Check that November 15 shows 1 event
    //const singleEventMarker = screen.getByText('1 Event(s)');
    //expect(singleEventMarker).toBeInTheDocument();
    expect(screen.getByText('2 Event(s)')).toBeInTheDocument();
    expect(screen.getByText('1 Event(s)')).toBeInTheDocument();
  });

  //Test #6: Does not show event marker for days without events listed.
  it('does not display events for days with no events.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );

    // Check that November 10 does not have an event marker.
    const dayWithoutEvents = screen.getByText('10');
    expect(dayWithoutEvents).not.toContainHTML('<div class="event-marker">');
  });


  //Test #7: Each day cell has an accessible aria-label.
  it('provides an accessible aria-label for all day cells.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );
    const dayWithEvents = screen.getByLabelText(/Day 3, has events/);
    expect(dayWithEvents).toBeInTheDocument();

    const dayWithoutEvents = screen.getByLabelText(/Day 10$/);
    expect(dayWithoutEvents).toBeInTheDocument();
  });

  //Test #8: Title attribute includes event names for days with events listed.
  it('sets title attribute with event titles for days with events.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );
    const dayWithEvents = screen.getByText('3').closest('.calendar-day');
    expect(dayWithEvents).toHaveAttribute('title', 'Event 1, Event 2');
  });

  //Test #9: Title attribute is empty for days without events listed.
  it('does not set title attribute for days without events listed.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={mockSelectedDate}
        onDayClick={mockOnDayClick}
        events={mockEvents}
      />
    );
    const dayWithoutEvents = screen.getByText('10').closest('.calendar-day');
    expect(dayWithoutEvents).toHaveAttribute('title', '');
  });

  //Test #10: Works with empty event list.
  it('renders correctly when no events are provided.', () => {
    render(
      <Days
        currentDate={mockDate}
        selectedDate={null}
        onDayClick={mockOnDayClick}
        events={[]} // No events.
      />
    );

    expect(screen.queryByText(/Event\(s\)/)).not.toBeInTheDocument();
  });
});
