import React from 'react';
import { render } from '@testing-library/react';
import PhotoGallery from '../src/components/PhotoGallery';

describe('PhotoGallery', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<PhotoGallery />);
    expect(getByText(/Photo Gallery/i)).toBeInTheDocument();
  });
});