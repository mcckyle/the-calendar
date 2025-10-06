//Filename: DaysOfWeek.test.jsx
//Author: Kyle McColgan
//Date: 5 October 2025
//Description: This file contains unit tests for the Days Of Week component.

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DaysOfWeek from '../components/DaysOfWeek/DaysOfWeek.jsx';

describe('DaysOfWeek Component', () => {

    //Test #1: Renders without crashing.
    it('renders the component without errors.', () => {
       render(<DaysOfWeek />);
       expect(screen.getByRole('row')).toBeInTheDocument();
    });

    //Test #2: Renders all seven days of the week.
    it('renders all seven days of the week.', () => {
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);

        const days = screen.getAllByRole('columnheader');
        expect(days).toHaveLength(7);
    });

    //Test #3: Displays correct day labels.
    it('displays correct day names.', () => {

        //Create the mock week.
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);

        const expectedDays = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu' ];
        expectedDays.forEach(day => {
            expect(screen.getByText(day)).toBeInTheDocument();
        });
    });

    //Test #4: Days appear in the correct order.
    it('renders the days in the correct order starting from Sunday.', () => {
        const mockWeekDays = [
            new Date(2025, 7, 3), // Sunday, July 3, 2025.
            new Date(2025, 7, 4),
            new Date(2025, 7, 5),
            new Date(2025, 7, 6),
            new Date(2025, 7, 7),
            new Date(2025, 7, 8),
            new Date(2025, 7, 9), // Saturday, July 9, 2025.
        ];

        render(<DaysOfWeek weekDays={mockWeekDays}/>);

        const dayLabels = screen.getAllByRole('columnheader').map(element =>
            element.querySelector('.day-label').textContent
        );

        expect(dayLabels).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    });

    //Test #5: No day text is empty.
    it('each day label is non-empty and correctly rendered.', () => {
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);

        const dayElements = screen.getAllByRole('columnheader');
        dayElements.forEach(element => {
            expect(element.textContent.trim().length).toBeGreaterThan(0);
        });
    });

    //Test #6: Each day has correct aria-label.
    it('each day has an aria-label describing the day.', () => {
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);

        mockWeekDays.forEach(day => {
            const expectedLabel = day.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            });

            expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
        });
    });

    //Test #7: Parent container has correct role for a row.
    it('parent container has role="row".', () => {
        render(<DaysOfWeek />);
        const container = screen.getByRole('row');
        expect(container).toHaveClass('days-of-week');
    });

    //Test #8: Each day cell has the expected CSS class.
    it('each day cell has class "days-of-week-item".', () => {
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);
        const dayCells = screen.getAllByRole('columnheader');
        dayCells.forEach(cell => {
            expect(cell).toHaveClass('day-item');
        });
    });

    //Test #9: Does not render any extra elements.
    it('does not render any unexpected elements.', () => {
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);
        const container = screen.getByRole('row');
        expect(container.children.length).toBe(7);
    });

    //Test #10: Renders plain text (not buttons or links).
    it('renders plain text elements for days.', () => {
        const mockWeekDays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2025, 7, i + 1))); //July 1-7, 2025.
        render(<DaysOfWeek weekDays={mockWeekDays} />);
        const days = screen.getAllByRole('columnheader');
        days.forEach(day => {
            expect(day.tagName.toLowerCase()).toBe('div');
        });
    });
});
