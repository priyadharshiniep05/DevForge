import React from 'react';
import { motion } from 'framer-motion';

/**
 * HeroSection component for displaying a responsive hero section with large background images.
 */
const HeroSection = () => {
  // Variants for Framer Motion to animate the hero section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5 } }
  };

  return (
    <motion.section
      className="relative h-screen w-full overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background image with Framer Motion animation */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-image.jpg)' }}
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      />
      {/* Overlay for text content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <h1 className="text-5xl font-bold text-white md:text-6xl lg:text-7xl">
          Capture the Moment
        </h1>
      </div>
    </motion.section>
  );
};

export default HeroSection;