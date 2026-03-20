import React from 'react';
import { render } from '@testing-library/react';
import HeroSection from '../src/components/HeroSection';

describe('HeroSection', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<HeroSection />);
    expect(getByText(/Capture the Moment/i)).toBeInTheDocument();
  });
});