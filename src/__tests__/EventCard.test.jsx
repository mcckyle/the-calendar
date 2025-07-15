//Filename: EventCard.test.jsx
//Author: Kyle McColgan
//Date: 14 July 2025
//Description: This file contains unit tests for the EventCard.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import EventCard from '../components/EventCard/EventCard.jsx';

describe("EventCard Component", () => {
  const validEvent = {
    title: "Sample Event",
    date: "2025-01-19",
    startTime: "15:00", // 3:00 PM
    endTime: "17:00", // 5:00 PM
    allDay: false,
    description: "This is a test description for the event.",
  };

  //Test #1: Renders event title.
  test("renders the event title properly.", () => {
    render(<EventCard {...validEvent} />);
    expect(screen.getByText("Sample Event")).toBeInTheDocument();
  });

//	test("renders EventCard with all props", () => {
//	  render(
//		<EventCard
//		  title={mockEvent.title}
//		  date={mockEvent.date}
//		  startTime={mockEvent.startTime}
//		  endTime={mockEvent.endTime}
//		  allDay={mockEvent.allDay}
//		  description={mockEvent.description}
//		/>
//	  );
//
//	  expect(screen.getByRole("article")).toBeInTheDocument();
//	  expect(screen.getByText("Sample Event")).toBeInTheDocument();
//
//	  // Match date and time more robustly
//	  expect(screen.getByText("Sunday, January 19, 2025\nFrom 3:00 PM to 5:00 PM")).toBeInTheDocument();
	  //expect(screen.getByText("From 3:00 PM to 5:00 PM")).toBeInTheDocument();

//	  expect(
//		screen.getByText("This is a test description for the event.")
//	  ).toBeInTheDocument();
//	});

//  test("renders without description when not provided", () => {
 //   render(
   //   <EventCard
     //   title={mockEvent.title}
       // date={mockEvent.date}
       // time={mockEvent.time}
        //description={null} // No description provided
      ///>
    //);

    //expect(screen.getByText("Sample Event")).toBeInTheDocument();
    //expect(screen.getByText("2025-01-19 at 3:00 PM")).toBeInTheDocument();
    //expect(screen.queryByText("This is a test description for the event.")).toBeNull(); // Description shouldn't exist
  //});

//   test("sets aria-labelledby attribute correctly", () => {
//     render(
//       <EventCard
//         title={mockEvent.title}
//         date={mockEvent.date}
//         time={mockEvent.time}
//         description={mockEvent.description}
//       />
//     );
//
//     const article = screen.getByRole("article");
//     expect(article).toHaveAttribute("aria-labelledby", mockEvent.title);
//   });

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
