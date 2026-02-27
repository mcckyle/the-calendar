//Filename: TimeSlot.test.jsx
//Author: Kyle McColgan
//Date: 26 February 2026
//Description: This file contains the unit tests for the TimeSlot component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TimeSlot from '../components/TimeSlot/TimeSlot.jsx';

describe('TimeSlot', () => {
  const mockOnEventClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Test #1: Renders the time label correctly.
  test('renders the time label correctly.', () => {
    const mockLabel = '10:00 AM';
    render(
      <TimeSlot
        label={mockLabel}
        events={[]}
        onEventClick={mockOnEventClick}
      />
    );

    // Assert that the time label is rendered.
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  //Test #2: Renders all events passed to the component.
  test('renders all events passed to the component.', () => {
    const mockEvents = [
      { id: 1, title: 'Meeting' },
      { id: 2, title: 'Lunch' },
    ];
    render(
      <TimeSlot
        label="2:00 PM"
        events={mockEvents}
        onEventClick={mockOnEventClick}
      />
    );

    // Assert that each event title is rendered.
    mockEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
    });
  });

  //Test #3: Calls onEventClick with the correct event when an event is clicked.
  test('calls onEventClick with the correct event when an event is clicked.', () => {
    const mockEvents = [
      { id: 1, title: 'Workout' },
      { id: 2, title: 'Dinner' },
    ];
    render(
      <TimeSlot
        label="7:00 PM"
        events={mockEvents}
        onEventClick={mockOnEventClick}
      />
    );

    // Click the first event.
    fireEvent.click(screen.getByText('Workout'));

    // Assert that onEventClick was called with the correct event.
    expect(mockOnEventClick).toHaveBeenCalledTimes(1);
    expect(mockOnEventClick).toHaveBeenCalledWith(mockEvents[0]);
  });

  //Test #4: Renders "—" placeholder when the events array is empty.
  test('renders "—" placeholder when the events array is empty.', () => {
    render(
      <TimeSlot
        label="9:00 AM"
        events={[]}
        onEventClick={mockOnEventClick}
      />
    );

    // Assert that the placeholder is rendered successfully.
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  //Test #5: Div has aria-label based on the time label.
  test('div has aria-label based on the time label.', () => {
    render(
      <TimeSlot
        label="11:00 AM"
        events={[]}
        onEventClick={mockOnEventClick}
      />
    );

    const div = screen.getByLabelText(/Events at 11:00 AM/i);
    expect(div).toBeInTheDocument();
  });

  //Test #6: Each event button has correct aria-label for accessibility purposes.
  test('each event button has correct aria-label for accessibility purposes.', () => {
    const mockEvents = [{ id: 1, title: 'Project Review' }];

    render(
      <TimeSlot
        label="3:00 PM"
        events={mockEvents}
        onEventClick={mockOnEventClick}
      />
    );

    const button = screen.getByRole('button', { name: /View event: Project Review/i });
    expect(button).toBeInTheDocument();
  });


  //Test #7: Renders multiple events as separate buttons.
  test('renders multiple events as separate buttons.', () => {
    const mockEvents = [
      { id: 1, title: 'Call' },
      { id: 2, title: 'Break' }
    ];

    render(
      <TimeSlot
        label="1:00 PM"
        events={mockEvents}
        onEventClick={mockOnEventClick}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockEvents.length);
  });


  //Test #8: Handles events with empty titles without crashing.
  test('handles events with empty titles without crashing.', () => {
    const mockEvents = [{ id: 1, title: '' }];

    render(
      <TimeSlot
        label="4:00 PM"
        events={mockEvents}
        onEventClick={mockOnEventClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });


  //Test #9: Calls onEventClick for each event when clicked.
  test('calls onEventClick for each event when clicked.', () => {
    const mockEvents = [
      { id: 1, title: 'Task A' },
      { id: 2, title: 'Task B' }
    ];

    render(
      <TimeSlot
        label="5:00 PM"
        events={mockEvents}
        onEventClick={mockOnEventClick}
      />
    );

    mockEvents.forEach((event) => {
      fireEvent.click(screen.getByText(event.title));
    });

    expect(mockOnEventClick).toHaveBeenCalledTimes(mockEvents.length);
  });


  //Test #10: Renders time label inside a span element.
  test('renders time label inside a span element.', () => {
    const label = '6:00 PM';

    render(
      <TimeSlot
        label={label}
        events={[]}
        onEventClick={mockOnEventClick}
      />
    );

    const span = screen.getByText(label).closest('span');
    expect(span).not.toBeNull();
  });
});
