// tests/components/AboutPage.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AboutPage from '../../src/components/AboutPage';

describe('AboutPage Component', () => {
  beforeEach(() => {
    // Render the AboutPage component before each test
    render(<AboutPage />);
  });

  it('should display the biography section correctly', () => {
    // Check if the biography section is present and contains the correct text
    const biographySection = screen.getByTestId('biography-section');
    expect(biographySection).toBeInTheDocument();
    expect(biographySection).toHaveTextContent(/About Me/i);
  });

  it('should interact with animations properly', () => {
    // Check if the animation is applied to the biography section
    const biographySection = screen.getByTestId('biography-section');
    expect(biographySection).toHaveClass('animate-fade-in'); // Assuming 'animate-fade-in' is the class for the animation
  });

  it('should handle dark mode toggling', () => {
    // Find the dark mode toggle button and click it
    const darkModeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(darkModeToggle);

    // Check if the body has the 'dark' class after toggling
    expect(document.body).toHaveClass('dark');

    // Toggle back to light mode
    fireEvent.click(darkModeToggle);
    expect(document.body).not.toHaveClass('dark');
  });

  it('should render without errors', () => {
    // Check if there are no errors in the console during rendering
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    render(<AboutPage />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});