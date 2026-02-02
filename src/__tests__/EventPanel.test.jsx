//Filename: EventPanel.test.jsx
//Author: Kyle McColgan
//Date: 2 February 2026
//Description: This file contains unit tests for the EventPanel component.

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import EventPanel from "../components/EventPanel/EventPanel.jsx";

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

  //Test #1: Calls onClose() when the overlay is clicked.
  test("calls onClose() when the overlay is clicked.", () => {
    const { container } = render(
      <EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />
    );

    const overlay = container.querySelector(".event-overlay");

    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  //Test #2: Does not render EventCard when no event is selected.
  test("does not render EventCard when no event is selected.", () => {
    render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);
    expect(screen.queryByTestId("event-card")).not.toBeInTheDocument();
  });

  //Test #3: Renders EventCard with selected event details.
  test("renders EventCard with selected event details.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    expect(screen.getByTestId("event-card")).toBeInTheDocument();
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("2024-12-25")).toBeInTheDocument();
    expect(screen.getByText("5:00 PM")).toBeInTheDocument();
    expect(screen.getByText("6:00 PM")).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  //Test #4: Calls onClock when the Close button is clicked.
  test("calls onClose when Close button is clicked.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: /close event details/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  //Test #5: Calls onClose() when the Escape key is pressed.
  test("calls onClose() when the Escape key is pressed.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  //Test #6: Uses role=\"dialog\" when event is selected.
  test('uses role="dialog" when an event is selected.', () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toBeInTheDocument();
  });

  //Test #7: Displays "Event Details" heading.
  test('displays "Event Details" heading.', () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    expect(screen.getByRole("heading", { name: /event details/i})).toBeInTheDocument();
  });

  //Test #8: Dialog has correct aria-labelledby.
  test("dialog has aria-labelledby pointing to header.", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAttribute("aria-labelledby", "event-panel-title");
  });

  //Test #9: Handles missing event details gracefully (renders defaults).
  test("renders default values when event details are missing.", () => {
    const incompleteEvent = { title: "", date: "" };
    render(<EventPanel selectedEvent={incompleteEvent} onClose={mockOnClose} />);

    expect(screen.getByText("No Start Time")).toBeInTheDocument();
    expect(screen.getByText("No End Time")).toBeInTheDocument();
  });

  //Test #10: Does not render the Close button when no event is selected.
  test("does not render the Close button when no event is selected.", () => {
    render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);

    expect(screen.queryByRole("button", { name: /close event details/i })).not.toBeInTheDocument();
  });
});
