// src/pages/portfolio.jsx
import React from 'react';
import Portfolio from '../components/Portfolio';

/**
 * Portfolio page component.
 * This page displays the photographer's portfolio using the Portfolio component,
 * supporting lazy loading for better performance.
 */
const PortfolioPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Portfolio</h1>
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;