// src/pages/about.jsx
import React from 'react';
import AboutPage from '../components/AboutPage';

/**
 * The about page component.
 * This page displays the photographer's biography and story using the AboutPage component.
 */
const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AboutPage />
    </div>
  );
};

export default About;