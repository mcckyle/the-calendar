import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventCard from '../components/Calendar/EventCard.jsx';

describe("EventCard Component", () => {
  const mockEvent = {
    title: "Sample Event",
    date: "2024-12-25",
    time: "5:00 PM",
    description: "This is a test description for the event.",
  };

  test("renders EventCard with all props", () => {
    render(
      <EventCard
        title={mockEvent.title}
        date={mockEvent.date}
        time={mockEvent.time}
        description={mockEvent.description}
      />
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("2024-12-25 at 5:00 PM")).toBeInTheDocument();
    expect(screen.getByText("This is a test description for the event.")).toBeInTheDocument();
  });

  test("renders without description when not provided", () => {
    render(
      <EventCard
        title={mockEvent.title}
        date={mockEvent.date}
        time={mockEvent.time}
        description={null} // No description provided
      />
    );

    expect(screen.getByText("Sample Event")).toBeInTheDocument();
    expect(screen.getByText("2024-12-25 at 5:00 PM")).toBeInTheDocument();
    expect(screen.queryByText("This is a test description for the event.")).toBeNull(); // Description shouldn't exist
  });

  test("sets aria-labelledby attribute correctly", () => {
    render(
      <EventCard
        title={mockEvent.title}
        date={mockEvent.date}
        time={mockEvent.time}
        description={mockEvent.description}
      />
    );

    const article = screen.getByRole("article");
    expect(article).toHaveAttribute("aria-labelledby", mockEvent.title);
  });

  //test("renders gracefully with missing title, date, or time", () => {
   // render(
     // <EventCard
       // title={null} // Missing title
        //date={null} // Missing date
        //time={null} // Missing time
        //description={mockEvent.description}
      ///>
    //);

    //expect(screen.queryByText("Sample Event")).toBeNull(); // No title
    //expect(screen.queryByText(/at/)).toBeNull(); // No date or time
    //expect(screen.getByText("This is a test description for the event.")).toBeInTheDocument(); // Only description should render
  //});

  //test("doesn't render invalid date/time text", () => {
    //render(
      //<EventCard
        //title={mockEvent.title}
        //date={""} // Empty date
        //time={""} // Empty time
        //description={mockEvent.description}
      ///>
    //);

    //expect(screen.getByText("Sample Event")).toBeInTheDocument();
    //expect(screen.queryByText(/at/)).toBeNull(); // "at" shouldn't render for empty date/time
  //});
});