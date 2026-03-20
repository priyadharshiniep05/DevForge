import React from 'react';
import { render } from '@testing-library/react';
import PortfolioSection from '../src/components/PortfolioSection';

describe('PortfolioSection', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<PortfolioSection />);
    expect(getByText(/My Portfolio/i)).toBeInTheDocument();
  });
});