import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import PhotoGallery from './components/PhotoGallery';
import ScrollAnimations from './components/ScrollAnimations';
import PortfolioSection from './components/PortfolioSection';
import Lightbox from './components/Lightbox';

// Main application component that ties all other components together
const App = () => {
  return (
    <motion.div className="min-h-screen bg-gray-100 text-black">
      {/* Hero section at the top of the page */}
      <HeroSection />

      {/* Photo gallery section showcasing various photos */}
      <PhotoGallery />

      {/* Scroll animations for smooth transitions */}
      <ScrollAnimations />

      {/* Portfolio section highlighting different projects */}
      <PortfolioSection />

      {/* Lightbox component for viewing images in a modal */}
      <Lightbox />
    </motion.div>
  );
};

export default App;