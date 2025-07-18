//Filename: DaysOfWeek.test.jsx
//Author: Kyle McColgan
//Date: 16 July 2025
//Description: This file contains unit tests for the DaysOfWeek.jsx component.

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
        render(<DaysOfWeek />);
        const days = screen.getAllByRole('columnheader');
        expect(days).toHaveLength(7);
    });

    //Test #3: Displays correct day labels.
    it('displays correct abbreviated day names.', () => {
        render(<DaysOfWeek />);
        const expectedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        expectedDays.forEach(day => {
            expect(screen.getByText(day)).toBeInTheDocument();
        });
    });

    //Test #4: Days appear in the correct order.
    it('renders the days in correct order starting from Sunday..', () => {
        render(<DaysOfWeek />);
        const days = screen.getAllByRole('columnheader');
        const dayTexts = days.map(day => day.textContent);
        expect(dayTexts).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    });

    //Test #5: No day text is empty.
    it('each day label is non-empty and correctly rendered.', () => {
        render(<DaysOfWeek />);
        const days = screen.getAllByRole('columnheader');
        days.forEach(day => {
            expect(day.textContent.trim().length).toBeGreaterThan(0);
        });
    });

    //Test #6: Each day has correct aria-label.
    it('each day has an aria-label describing the day.', () => {
        render(<DaysOfWeek />);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            expect(screen.getByLabelText(`Day of week: ${day}`)).toBeInTheDocument();
        });
    });

    //Test #7: Parent container has correct role for a row.
    it('parent container has role="row".', () => {
        render(<DaysOfWeek />);
        const container = screen.getByRole('row');
        expect(container).toHaveClass('days-of-week-container');
    });

    //Test #8: Each day cell has the expected CSS class.
    it('each day cell has class "days-of-week-item".', () => {
        render(<DaysOfWeek />);
        const dayCells = screen.getAllByRole('columnheader');
        dayCells.forEach(cell => {
            expect(cell).toHaveClass('days-of-week-item');
        });
    });

    //Test #9: Does not render any extra elements.
    it('does not render any unexpected elements.', () => {
        render(<DaysOfWeek />);
        const container = screen.getByRole('row');
        expect(container.children.length).toBe(7);
    });

    //Test #10: Renders plain text (not buttons or links).
    it('renders plain text elements for days.', () => {
        render(<DaysOfWeek />);
        const days = screen.getAllByRole('columnheader');
        days.forEach(day => {
            expect(day.tagName.toLowerCase()).toBe('div');
        });
    });
});
