import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Lightbox from '../src/components/Lightbox';

describe('Lightbox', () => {
  it('renders without crashing', () => {
    const { getByAltText } = render(<Lightbox src='/path/to/image.jpg' />);
    expect(getByAltText(/Gallery/i)).toBeInTheDocument();
  });

  it('opens and closes the lightbox', () => {
    const { getByAltText, getByRole } = render(<Lightbox src='/path/to/image.jpg' />);
    fireEvent.click(getByAltText(/Gallery/i));
    expect(getByRole('img')).toBeInTheDocument();
    fireEvent.click(getByRole('img'));
    expect(getByRole('img')).not.toBeInTheDocument();
  });
});