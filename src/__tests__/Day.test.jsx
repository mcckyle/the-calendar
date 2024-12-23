import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Day from '../components/Calendar/Day';

// Mock data
const mockEvents = [
  { id: 1, title: 'Meeting', date: '2024-11-05' },
  { id: 2, title: 'Workshop', date: '2024-11-06' },
];

const mockOnClick = jest.fn();

describe('Day Component', () => {
  it('renders the day correctly', () => {
    render(
      <Day
        day={5}
        selectedDate={new Date('2024-11-05')}
        currentDate={new Date('2024-11-05')}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    // Check if the day 5 is rendered
    expect(screen.getByText('5')).toBeInTheDocument();
  });

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

  it('does not apply "selected" class when day is not selected', () => {
    render(
      <Day
        day={6}
        selectedDate={new Date('2024-11-05')}
        currentDate={new Date('2024-11-05')}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    // Ensure the "selected" class is not applied
    expect(screen.getByText('6').parentElement).not.toHaveClass('selected');
  });

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

  it('does not show an event indicator when there are no events for the day', () => {
    render(
      <Day
        day={7}
        selectedDate={new Date('2024-11-05')}
        currentDate={new Date('2024-11-05')}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    // Ensure no event indicator is shown for day 7
    expect(screen.queryByText('Meeting')).toBeNull();
  });

  it('calls the onClick handler when the day is clicked', () => {
    render(
      <Day
        day={5}
        selectedDate={new Date('2024-11-05')}
        currentDate={new Date('2024-11-05')}
        onClick={mockOnClick}
        events={mockEvents}
      />
    );

    // Click on the day
    fireEvent.click(screen.getByText('5'));

    // Ensure the onClick function is called with the correct day
    expect(mockOnClick).toHaveBeenCalledWith(5);
  });
});
