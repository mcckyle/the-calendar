//Filename: EventPanel.test.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains unit tests for the EventPanel.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventPanel from '../components/EventPanel/EventPanel.jsx';
import EventCard from '../components/EventCard/EventCard.jsx';

jest.mock("../components/EventCard/EventCard.jsx", () => {
  // Mock EventCard for isolation
  return ({ title, date, time, description }) => (
    <div data-testid="event-card">
      <h3>{title}</h3>
      <p>{date}</p>
      <p>{time}</p>
      <p>{description}</p>
    </div>
  );
});

describe("EventPanel Component", () => {
  const mockOnClose = jest.fn();
  const mockEvent = {
    title: "Sample Event",
    date: "2024-12-25",
    time: "5:00 PM",
    description: "This is a test description for the event.",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  //test("renders EventPanel with event details", () => {
  //  render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    //expect(screen.getByText("Event Details")).toBeInTheDocument();
    //expect(screen.getByText("Sample Event")).toBeInTheDocument();
    //expect(screen.getByText("2024-12-25")).toBeInTheDocument();
    //expect(screen.getByText("5:00 PM")).toBeInTheDocument();
    //expect(screen.getByText("This is a test description for the event.")).toBeInTheDocument();
  //});

  test("calls onClose when Close button is clicked", () => {
    render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  //test("passes correct props to EventCard", () => {
  //  render(<EventPanel selectedEvent={mockEvent} onClose={mockOnClose} />);

    //const eventCard = screen.getByTestId("event-card");

    //expect(eventCard).toHaveTextContent("Sample Event");
    //expect(eventCard).toHaveTextContent("2024-12-25");
    //expect(eventCard).toHaveTextContent("5:00 PM");
    //expect(eventCard).toHaveTextContent("This is a test description for the event.");
  //});

  //test("renders without crashing if no event is selected", () => {
  //  render(<EventPanel selectedEvent={null} onClose={mockOnClose} />);

    //expect(screen.queryByText("Event Details")).toBeNull();
    //expect(screen.queryByTestId("event-card")).toBeNull();
  //});
});