import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCards from '../components/Calendar/EventCards';

jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error in test output

const mockEvents = [
  { id: 1, title: 'Meeting', date: '2024-11-05', time: '10:00 AM', description: 'Team meeting' },
  { id: 2, title: 'Workshop', date: '2024-11-05', time: '2:00 PM', description: 'React workshop' },
  { id: 3, title: 'Invalid Event', date: 'invalid-date', time: 'N/A', description: 'Corrupted event' },
];

describe('EventCards Component', () => {
  afterAll(() => {
    console.error.mockRestore(); // Restore console.error
  });

  it('renders a message when selectedDate is invalid or undefined', () => {
    render(<EventCards selectedDate={null} events={mockEvents} />);
    expect(screen.getByText(/Please select a valid date/i)).toBeInTheDocument();
  });

  it('renders a message when no events are available for the selected date', () => {
    const selectedDate = new Date('2024-11-06'); // Date with no events
    render(<EventCards selectedDate={selectedDate} events={mockEvents} />);
    expect(screen.getByText(/No events for this day/i)).toBeInTheDocument();
  });

//     it('renders EventCard components for events matching the selected date', async () => {
//     const selectedDate = new Date('2024-11-05'); // Date with two events
//
//     render(<EventCards selectedDate={selectedDate} events={mockEvents} />);
//
//     // Wait for the elements to appear
//     const meetingEvent = await screen.findByText(/Meeting/i); // Event with title 'Meeting'
//     const workshopEvent = await screen.findByText(/React workshop/i); // Event with title 'React workshop'
//
//     // Ensure both events are in the document
//     expect(meetingEvent).toBeInTheDocument();
//     expect(workshopEvent).toBeInTheDocument();
//     });

  it('does not render events with invalid dates and logs an error', () => {
    const selectedDate = new Date('2024-11-05');
    render(<EventCards selectedDate={selectedDate} events={mockEvents} />);
    expect(screen.queryByText(/Invalid Event/i)).not.toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith('Invalid event date: invalid-date');
  });
});

