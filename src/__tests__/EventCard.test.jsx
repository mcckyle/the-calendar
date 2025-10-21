//Filename: EventCard.test.jsx
//Author: Kyle McColgan
//Date: 20 October 2025
//Description: This file contains unit tests for the EventCard component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EventCard from '../components/EventCard/EventCard.jsx';

process.env.TZ = 'America/Chicago'; // Force CST for consistent tests.

describe("EventCard Component", () => {
  const validEvent = {
    title: "Sample Event",
    date: "2025-01-19T00:00:00-06:00", //Explicit CST Midnight.
    startTime: new Date("2025-01-19T15:00:00-06:00"), // 3:00 PM.
    endTime: new Date("2025-01-19T17:00:00-06:00"), // 5:00 PM.
    allDay: false,
    description: "This is a test description for the event.",
  };

  //Test #1: Renders event title.
  test("renders the event title properly.", () => {
    render(<EventCard {...validEvent} />);
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
  });

  //Test #2: Renders formatted date correctly.
  test("renders the formatted date.", () => {
    render(<EventCard {...validEvent} />);
    expect(screen.getByText(/Sunday, January 19, 2025/)).toBeInTheDocument();
  });

  //Test #3: Displays formatted start time for non-all-day events.
  test("renders formatted start time when allDay is false.", () => {
    render(<EventCard {...validEvent} />);
    expect(screen.getByText(/3:00 PM/)).toBeInTheDocument();
  });

  //Test #4: Does not display time for all-day events.
  test("does not render start time if allDay is true.", () => {
    const allDayEvent = { ...validEvent, allDay: true};
    render(<EventCard {...allDayEvent} />);
    expect(screen.queryByText(/3:00 PM/)).toBeNull();
  });

  //Test #5: Renders description if provided.
  test("renders description if one is provided.", () => {
    render(<EventCard {...validEvent} />);
    expect(screen.getByText("This is a test description for the event.")).toBeInTheDocument();
  });

  //Test #6: Does not render description when not provided.
  test("does not render description when not provided.", () => {
    const noDescriptionEvent = { ...validEvent, description: ""};
    render(<EventCard {...noDescriptionEvent} />);
    expect(screen.queryByText(/This is a test description./)).toBeNull();
  });

  //Test #7: Displays 'No Start Time' when startTime is invalid.
//   test("renders fallback text if startTime is invalid.", () => {
//     const invalidTimeEvent = { ...validEvent, startTime: "invalid-date"};
//     render(<EventCard {...invalidTimeEvent} />);
//     expect(screen.getByText(/No Start Time/i)).toBeInTheDocument();
//   });

  //Test #8: Displays 'Invalid Date' if date prop is missing or is invalid.
  test("renders 'Invalid Date' for invalid or missing date.", () => {
    const invalidDateEvent = { ...validEvent, date: ""};
    render(<EventCard {...invalidDateEvent} />);
    expect(screen.getByText(/Invalid Date/)).toBeInTheDocument();
  });

  //Test #9: EventCard has proper role and aria-labelledby.
  test("component has proper role and an accessible label.", () => {
    render(<EventCard {...validEvent} />);
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", "event-Sample Event");
  });

  //Test #10: Snapshot test for UI consistency purposes.
//   test("matches snapshot.", () => {
//     const { asFragment } = render(<EventCard {...validEvent} />);
//     expect(asFragment()).toMatchSnapshot();
//   });
});
