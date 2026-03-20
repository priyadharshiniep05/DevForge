import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  // Define animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      <motion.p className="text-lg leading-relaxed" variants={textVariants}>
        As a passionate photographer, I have been capturing the beauty of the world through my lens for over a decade. My journey began with a simple camera and a curiosity to explore different perspectives. Over time, I honed my skills in various genres including portrait, landscape, and street photography.
      </motion.p>
      <motion.p className="text-lg leading-relaxed mt-4" variants={textVariants}>
        My work has been featured in several local galleries and online platforms, allowing me to connect with fellow photographers and art enthusiasts. I believe that every photograph tells a story, and it is my mission to share those stories through my lens.
      </motion.p>
    </motion.div>
  );
};

export default AboutPage;