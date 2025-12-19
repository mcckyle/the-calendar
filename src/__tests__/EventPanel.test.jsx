//Filename: EventPanel.test.jsx
//Author: Kyle McColgan
//Date: 16 December 2025
//Description: This file contains unit tests for the EventPanel component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import EventPanel from '../components/EventPanel/EventPanel.jsx';

// Mock EventCard for isolation.
jest.mock("../components/EventCard/EventCard.jsx", () => {
  return ({ title, date, startTime, endTime, description }) => (
    <div data-testid="event-card">
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{startTime || "No Start Time"}</p>
      <p>{endTime || "No End Time"}</p>
      <p>{description}</p>
    </div>
  );
});

describe("EventPanel Component", () => {
  const mockOnClose = jest.fn();
  const mockEvent = {
    title: "Sample Event",
    date: "2024-12-25",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    description: "This is a test description for the event.",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  //Test #1: Renders "No event selected" when selectedEvent is null.
  test("renders fallback message when no event is selected.", () => {
    render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);
    expect(screen.getByText(/Select an event to view details!/i)).toBeInTheDocument();
  });

  //Test #2: Does not render EventCard when no event is selected.
  test("does not render EventCard when no event is selected.", () => {
    render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);
    expect(screen.queryByTestId("event-card")).not.toBeInTheDocument();
  });

  //Test #3: Renders EventCard when selectedEvent is provided.
  test("renders EventCard with selected event details.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);
    expect(screen.getByTestId("event-card")).toBeInTheDocument();
    expect(screen.getByText(/Sample Event/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-12-25/i)).toBeInTheDocument();
    expect(screen.getByText(/5:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/6:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test description/i)).toBeInTheDocument();
  });

  //Test #4: Calls onClock when the Close button gets clicked on.
  test("calls onClose when Close button gets clicked on.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  //Test #5: The EventPanel has aria-live="polite" when no event is selected.
  test('applies aria-live="polite" when no event is selected.', () => {
    render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);

    const section = screen.getByRole('region', { hidden: true }) || document.querySelector('.event-panel');

    expect(section).toHaveAttribute('aria-live', 'polite');
  });

  //Test #6: The EventPanel uses role="dialog" when an event is selected.
  test('uses role="dialog" when an event is selected.', () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    const dialog = screen.getByRole('dialog');

    expect(dialog).toBeInTheDocument();
  });

  //Test #7: Displays a header with text "Event Details" when an event is selected.
  test('displays "Event Details" heading for a selected event.', () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /Event Details/i})).toBeInTheDocument();
  });

  //Test #8: Provides an accessible name for the dialog.
  test("dialog has aria-labelledby pointing to the header.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-labelledby', 'event-panel-title');
  });

  //Test #9: Handles missing event details gracefully (renders defaults).
  test("renders default values if event details are missing.", () => {
    const incompleteEvent = { title: "", date: "" }; //Test event is missing the time and description field values...
    render(<EventPanel selectedEvent={incompleteEvent} onClose={mockOnClose} />);

    expect(screen.getByText(/Untitled Event/i)).toBeInTheDocument();
  });

  //Test #10: Does not render the Close button when no event is selected.
  test("does not render the Close button when no event is selected.", () => {
    render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);

    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
});
