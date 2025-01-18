import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TimeSlot from '../components/Calendar/TimeSlot.jsx';

describe('TimeSlot', () => {
  const mockOnEventClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the time label correctly', () => {
    const mockLabel = '10:00 AM';
    render(
      <TimeSlot
        label={mockLabel}
        events={[]}
        onEventClick={mockOnEventClick}
      />
    );

    // Assert that the time label is rendered
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  test('renders "No events" placeholder when events array is empty', () => {
    render(
      <TimeSlot
        label="9:00 AM"
        events={[]}
        onEventClick={mockOnEventClick}
      />
    );

    // Assert that the "No events" placeholder is rendered
    expect(screen.getByText('No events')).toBeInTheDocument();
  });

  test('renders all events passed to the component', () => {
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

    // Assert that each event title is rendered
    mockEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
    });
  });

  test('calls onEventClick with the correct event when an event is clicked', () => {
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

    // Click the first event
    fireEvent.click(screen.getByText('Workout'));

    // Assert that onEventClick was called with the correct event
    expect(mockOnEventClick).toHaveBeenCalledTimes(1);
    expect(mockOnEventClick).toHaveBeenCalledWith(mockEvents[0]);
  });

  //test('renders no duplicate keys for events', () => {
  //  const mockEvents = [
   //   { id: 1, title: 'Yoga' },
    //  { id: 1, title: 'Duplicate Key Test' }, // Duplicate id to test key handling
    //];
    //const { container } = render(
      //<TimeSlot
        //label="10:00 AM"
        //events={mockEvents}
        //onEventClick={mockOnEventClick}
      ///>
    //);

    // Assert that each event is rendered despite duplicate IDs
    //const eventDivs = container.querySelectorAll('.event');
    //expect(eventDivs.length).toBe(2);
  //});
});