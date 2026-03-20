import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../../src/components/ContactForm';

describe('ContactForm Component', () => {
  it('renders all input fields correctly', () => {
    render(<ContactForm />);
    
    // Check if all input fields are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates email input correctly', async () => {
    render(<ContactForm />);
    
    // Fill out the form with invalid email
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'invalid-email');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check if error message for email is displayed
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
  });

  it('submits the form successfully with valid inputs', async () => {
    render(<ContactForm />);
    
    // Fill out the form with valid data
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Hello, this is a test message.');
    
    // Mock the form submission
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Check if form was submitted correctly
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'Hello, this is a test message.',
    });
  });

  it('toggles dark mode correctly', async () => {
    render(<ContactForm />);
    
    // Toggle dark mode
    await userEvent.click(screen.getByRole('button', { name: /toggle dark mode/i }));
    
    // Check if body has the dark mode class
    expect(document.body).toHaveClass('dark');
  });
});