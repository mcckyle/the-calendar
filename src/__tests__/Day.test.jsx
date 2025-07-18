//Filename: Day.test.jsx
//Author: Kyle McColgan
//Date: 16 July 2025
//Description: This file contains unit tests for the Day.jsx component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Day from '../components/Day/Day.jsx';

// Mock data
const mockEvents = [
  { id: 1, title: 'Meeting', date: '2024-11-05' },
  { id: 2, title: 'Workshop', date: '2024-11-06' },
];

const mockOnClick = jest.fn();
const currentDate = new Date(2024, 10, 1); // November 2024.

describe('Day Component', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  //Test #1: Properly renders the day number.
  test('properly renders the correct day number.', () => {
    render(
      <Day
        day={5}
        selectedDate={null}
        currentDate={currentDate}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  //Test #2: Applies "selected" class when day matches selectedDate.
  test('Applies selected class if the day is the selected date.', () => {
    const selectedDate = new Date(2024, 10, 5);

    render(
      <Day
        day={5}
        selectedDate={selectedDate}
        currentDate={currentDate}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );
    const dayElement = screen.getByText('5').closest('.calendar-day');
    expect(dayElement).toHaveClass('selected');
  });

  //Test #3: Does not apply selected class for a different date.
  test('Does not apply selected class if selectedDate is different.', () => {
    const selectedDate = new Date(2024, 10, 6);

    render(
      <Day
        day={5}
        selectedDate={selectedDate}
        currentDate={currentDate}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );
    const dayElement = screen.getByText('5').closest('.calendar-day');
    expect(dayElement).not.toHaveClass('selected');
  });

  //Test #4: Displays event indicator when events exist for this day.
  test('Shows event indicator if the day has events.', () => {
    render(
      <Day
        day={5}
        selectedDate={null}
        currentDate={currentDate}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    //const indicator = screen.getByText((content) => content.includes('Meeting'));
//     const indicator = screen.getByText('Meeting');
    expect(screen.getByText('Meeting')).toBeInTheDocument();
    //screen.debug(undefined, 99999);
    //console.log("================================ DEBUG FOR DAY COMPONENT ================================");
  });

  //Test #5: Does not display event indicator when no events exist for this day.
  test('does not show event indicator if the day has no events.', () => {
    render(
      <Day
        day={7}
        selectedDate={null}
        currentDate={currentDate}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    expect(screen.queryByText('Meeting')).not.toBeInTheDocument();
  });

    //Test #6: Calls onClick handler when the day is clicked on.
    test('Calls onClick with correct day when day is clicked on.', () => {
      render(
        <Day
          day={5}
          selectedDate={null}
          currentDate={currentDate}
          onClick={mockOnClick}
          events={mockEvents}
        />
      );
      fireEvent.click(screen.getByText('5'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(5);
    });

    //Test #7: Sets correct aria-label for accessibility.
    test('Sets correct aria-label including selected and event info.', () => {
      const selectedDate = new Date(2024, 10, 5);

      render(
        <Day
          day={5}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onClick={mockOnClick}
          events={mockEvents}
        />
      );

      const dayElement = screen.getByLabelText(/Day5 \(selected\), has event/i);
      expect(dayElement).toBeInTheDocument();
    });

    //Test #8: aria-label does not include "selected" if not selected.
    test('aria-label does not include "selected" if not selected.', () => {
      render(
        <Day
          day={6}
          selectedDate={null}
          currentDate={currentDate}
          onClick={mockOnClick}
          events={mockEvents}
        />
      );

      const dayElement = screen.getByLabelText(/Day6 , has event/i);
      expect(dayElement).toBeInTheDocument();
    });

    //Test #9: title attribute equals first event title if events exist.
    test('sets title attribute to the first event title for the day.', () => {
      render(
        <Day
          day={5}
          selectedDate={null}
          currentDate={currentDate}
          onClick={mockOnClick}
          events={mockEvents}
          />
      );

      const dayElement = screen.getByText('5').closest('.calendar-day');
      expect(dayElement).toHaveAttribute('title', 'Meeting');
    });

    //Test #10: title attribute is not present when no events exist.
    test('title attribute is empty when no events exist for the day.', () => {
      render(
        <Day
          day={10}
          selectedDate={null}
          currentDate={currentDate}
          onClick={mockOnClick}
          events={mockEvents}
        />
      );

      const dayElement = screen.getByText('10').closest('.calendar-day');
      expect(dayElement).not.toHaveAttribute('title');
    });

// *** OLD tests commented out below this line... ***
//   it('renders the day correctly', () => {
//     render(
//       <Day
//         day={5}
//         selectedDate={new Date('2024-11-05')}
//         currentDate={new Date('2024-11-05')}
//         onClick={mockOnClick}
//         events={mockEvents}
//       />
//     );
//
//     // Check if the day 5 is rendered
//     expect(screen.getByText('5')).toBeInTheDocument();
//   });

//   it('applies "selected" class when day is selected', () => {
//     render(
//       <Day
//         day={5}
//         selectedDate={new Date('2024-11-05')}
//         currentDate={new Date('2024-11-05')}
//         onClick={mockOnClick}
//         events={mockEvents}
//       />
//     );
//
//     // Ensure the selected class is applied
//     expect(screen.getByText('5').parentElement).toHaveClass('selected');
//   });
//   it('does not apply "selected" class when day is not selected', () => {
//     render(
//       <Day
//         day={6}
//         selectedDate={new Date('2024-11-05')}
//         currentDate={new Date('2024-11-05')}
//         onClick={mockOnClick}
//         events={mockEvents}
//       />
//     );
//
//     // Ensure the "selected" class is not applied
//     expect(screen.getByText('6').parentElement).not.toHaveClass('selected');
//   });
//   it('shows an event indicator when there are events for the day', () => {
//     render(
//       <Day
//         day={5}
//         selectedDate={new Date('2024-11-05')}
//         currentDate={new Date('2024-11-05')}
//         onClick={mockOnClick}
//         events={mockEvents}
//       />
//     );
//
//     // Check if event indicator is shown for day 5
//     expect(screen.getByText('Meeting')).toBeInTheDocument();
//   });
//   it('does not show an event indicator when there are no events for the day', () => {
//     render(
//       <Day
//         day={7}
//         selectedDate={new Date('2024-11-05')}
//         currentDate={new Date('2024-11-05')}
//         onClick={mockOnClick}
//         events={mockEvents}
//       />
//     );
//
//     // Ensure no event indicator is shown for day 7
//     expect(screen.queryByText('Meeting')).toBeNull();
//   });
//
//   it('calls the onClick handler when the day is clicked', () => {
//     render(
//       <Day
//         day={5}
//         selectedDate={new Date('2024-11-05')}
//         currentDate={new Date('2024-11-05')}
//         onClick={mockOnClick}
//         events={mockEvents}
//       />
//     );
//
//     // Click on the day
//     fireEvent.click(screen.getByText('5'));
//
//     // Ensure the onClick function is called with the correct day
//     expect(mockOnClick).toHaveBeenCalledWith(5);
//   });
});
