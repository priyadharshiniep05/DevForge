// src/components/ScrollAnimations.jsx

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollAnimations component
 * 
 * This component provides smooth scrolling animations using Framer Motion.
 * It wraps its children with a motion.div that animates when in view.
 */
const ScrollAnimations = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimations;