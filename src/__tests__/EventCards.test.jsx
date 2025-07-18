//Filename: EventCards.test.jsx
//Author: Kyle McColgan
//Date: 16 July 2025
//Description: This file contains unit tests for the EventCards.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EventCards from '../components/EventCards/EventCards.jsx';

jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error in test output.

const mockEvents = [
  { id: 1, title: 'Meeting', date: '2024-11-05', startTime: '10:00 AM', description: 'Team meeting' },
  { id: 2, title: 'Workshop', date: '2024-11-05', startTime: '2:00 PM', description: 'React workshop' },
  { id: 3, title: 'Conference', date: '2024-11-06', startTime: '9:00 AM', description: 'Tech conference' },
  { id: 4, title: 'Invalid Event', date: 'invalid-date', startTime: 'N/A', description: 'Corrupted event' },
];

describe('EventCards Component', () => {
  afterAll(() => {
    console.error.mockRestore(); // Restore console.error
  });

  //Test #1: Renders message when selectedDate is invalid or undefined.
  it('renders a message when selectedDate is invalid or undefined', () => {
    render(<EventCards selectedDate={null} events={mockEvents} />);
    expect(screen.getByText(/Please select a valid date/i)).toBeInTheDocument();
  });

  //Test #2: Renders "No events" message when no events match the selected date.
  it('renders a message when no events are available for the selected date', () => {
    render(<EventCards selectedDate={new Date('2024-11-10')} events={mockEvents} />);
    expect(screen.getByText(/No events for this day/i)).toBeInTheDocument();
  });

  //Test #3: Displays all matching events for the selected date.
  it('renders multiple EventCard components for matching events.', () => {
    render(<EventCards selectedDate={new Date('2024-11-05')} events={mockEvents} />);

    // Use getAllByText and check the count.
    const eventTitles = screen.getAllByText(/Meeting|Workshop/i, { selector: 'h3' });
    expect(eventTitles).toHaveLength(2);
  });

  //Test #4: Displays correct event description inside the EventCard.
  it('renders event descriptions correctly.', () => {
    render(<EventCards selectedDate={new Date('2024-11-05')} events={mockEvents} />);
    expect(screen.getByText(/Team meeting/i)).toBeInTheDocument();
    expect(screen.getByText(/React workshop/i)).toBeInTheDocument();
  });

  //Test #5: Does not render invalid events and logs error.
  it('excludes invalid-date events and logs error.', () => {
    render(<EventCards selectedDate={new Date('2024-11-05')} events={mockEvents} />);
    expect(screen.queryByText(/Invalid Event/i)).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith('Invalid event date: invalid-date');
  });

  //Test #6: Filters events strictly by day (not by month/year only).
  it('only shows events matching the exact selected date.', () => {
    const selectedDate = new Date('2024-11-06');
    render(
      <EventCards
        selectedDate={selectedDate}
        events={[
          ...mockEvents,
          { id: 5, title: 'Extra Conference', date: '2024-11-06', description: 'Another tech conference' }
        ]}
      />
    );

    // Confirm unrelated events are excluded.
    expect(screen.queryByRole('heading', { name: /Meeting/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Workshop/i })).not.toBeInTheDocument();

    const conferenceHeadings = screen.getAllByRole('heading', { name: /Conference/i });
    expect(conferenceHeadings.length).toBe(2); // One conference from mockEvents + 1 from added = 2 Conferences.
  });

  //Test #7: Applies aria-live="polite" for accessibility purposes.
  it('has aria-live="polite" for the section container.', () => {
    render(<EventCards selectedDate={new Date('2024-11-06')} events={mockEvents} />);
    const section = screen.getByRole('region', { hidden: true }) || document.querySelector('.event-cards');
    expect(section).toHaveAttribute('aria-live', 'polite');
  });

  //Test #8: Displays the correct number of EventCard elements for the selected date.
  it('renders the correct number of event cards.', () => {
    render(<EventCards selectedDate={new Date('2024-11-05')} events={mockEvents} />);
    const eventCards = screen.getAllByRole('article'); // EventCard uses <article> tag.
    expect(eventCards).toHaveLength(2);
  });

  //Test #9: Handles empty events array gracefully.
  it('shows "No events for this day!" when events list is empty.', () => {
    render(<EventCards selectedDate={new Date('2024-11-05')} events={[]} />);
    expect(screen.getByText(/No events for this day!/i)).toBeInTheDocument();
  });

  //Test #10: Displays message if selectedDate is NaN (invalid Date object).
  it('renders invalid date message if selectedDate is NaN.', () => {
    const invalidDate = new Date('invalid-date');
    render(<EventCards selectedDate={invalidDate} events={mockEvents} />);
    expect(screen.getByText(/Please select a valid date!!/i)).toBeInTheDocument();
  });
});

