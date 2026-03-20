// tests/components/BlogSection.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogSection from '../../src/components/BlogSection';

describe('BlogSection Component', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first blog post.',
      imageUrl: '/images/post1.jpg',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the second blog post.',
      imageUrl: '/images/post2.jpg',
    },
  ];

  it('renders blog posts correctly', () => {
    render(<BlogSection posts={mockPosts} />);
    
    // Check if all titles are rendered
    mockPosts.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });

    // Check if all images are rendered
    mockPosts.forEach(post => {
      expect(screen.getByAltText(`Image for ${post.title}`)).toHaveAttribute('src', post.imageUrl);
    });
  });

  it('supports lazy loading of images', () => {
    render(<BlogSection posts={mockPosts} />);
    
    // Check if images have the loading attribute set to 'lazy'
    mockPosts.forEach(post => {
      expect(screen.getByAltText(`Image for ${post.title}`)).toHaveAttribute('loading', 'lazy');
    });
  });

  it('handles dark mode toggling correctly', () => {
    render(<BlogSection posts={mockPosts} />);
    
    // Simulate dark mode toggle
    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(toggleButton).toBeInTheDocument();
    toggleButton.click();

    // Check if body has the 'dark' class after toggling
    expect(document.body.classList.contains('dark')).toBe(true);
  });
});