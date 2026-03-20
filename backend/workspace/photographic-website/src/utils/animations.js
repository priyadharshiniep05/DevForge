/**
 * @file animations.js
 * @description Utility file for defining custom animations used throughout the application.
 */

import { motion } from 'framer-motion';

/**
 * Custom animation variants for fade-in effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

/**
 * Custom animation variants for slide-up effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const slideUpVariants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.75, ease: 'easeOut' } }
};

/**
 * Custom animation variants for staggered fade-in effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerFadeInVariants = {
  initial: ({ delay }) => ({
    opacity: 0,
    transition: { duration: 0.5, delay }
  }),
  animate: { opacity: 1 }
};

/**
 * Custom animation variants for scale-up effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const scaleUpVariants = {
  initial: { scale: 0.8 },
  animate: { scale: 1, transition: { duration: 0.5 } }
};

/**
 * Custom animation variants for rotate-in effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const rotateInVariants = {
  initial: { rotateY: '90deg' },
  animate: { rotateY: '0deg', transition: { duration: 1, ease: 'easeInOut' } }
};

/**
 * Custom animation variants for staggered slide-up effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerSlideUpVariants = {
  initial: ({ delay }) => ({
    y: '100%',
    transition: { duration: 0.75, ease: 'easeOut', delay }
  }),
  animate: { y: 0 }
};

/**
 * Custom animation variants for bounce effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const bounceVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
  }
};

/**
 * Custom animation variants for flip effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const flipVariants = {
  initial: { rotateX: '90deg' },
  animate: { rotateX: '0deg', transition: { duration: 1, ease: 'easeInOut' } }
};

/**
 * Custom animation variants for zoom-in effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const zoomInVariants = {
  initial: { scale: 0.5 },
  animate: { scale: 1, transition: { duration: 0.75, ease: 'easeOut' } }
};

/**
 * Custom animation variants for wave effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const waveVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Custom animation variants for glitch effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const glitchVariants = {
  initial: {},
  animate: {
    clipPath: [
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      'polygon(5% 0, 95% 0, 95% 100%, 5% 100%)',
      'polygon(20% 0, 80% 0, 80% 100%, 20% 100%)'
    ],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      ease: 'steps(5)'
    }
  }
};

/**
 * Custom animation variants for pulse effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Custom animation variants for spin effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const spinVariants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

/**
 * Custom animation variants for skew effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const skewVariants = {
  initial: { transform: 'skewX(0deg)' },
  animate: {
    transform: ['skewX(0deg)', 'skewX(-10deg)', 'skewX(0deg)'],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Custom animation variants for staggered scale-up effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerScaleUpVariants = {
  initial: ({ delay }) => ({
    scale: 0.8,
    transition: { duration: 0.5, delay }
  }),
  animate: { scale: 1 }
};

/**
 * Custom animation variants for staggered rotate-in effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerRotateInVariants = {
  initial: ({ delay }) => ({
    rotateY: '90deg',
    transition: { duration: 1, ease: 'easeInOut', delay }
  }),
  animate: { rotateY: '0deg' }
};

/**
 * Custom animation variants for staggered flip effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerFlipVariants = {
  initial: ({ delay }) => ({
    rotateX: '90deg',
    transition: { duration: 1, ease: 'easeInOut', delay }
  }),
  animate: { rotateX: '0deg' }
};

/**
 * Custom animation variants for staggered zoom-in effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerZoomInVariants = {
  initial: ({ delay }) => ({
    scale: 0.5,
    transition: { duration: 0.75, ease: 'easeOut', delay }
  }),
  animate: { scale: 1 }
};

/**
 * Custom animation variants for staggered wave effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerWaveVariants = {
  initial: ({ delay }) => ({
    y: 0,
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut', delay }
  }),
  animate: { y: [0, -10, 0] }
};

/**
 * Custom animation variants for staggered glitch effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerGlitchVariants = {
  initial: {},
  animate: {
    clipPath: [
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      'polygon(5% 0, 95% 0, 95% 100%, 5% 100%)',
      'polygon(20% 0, 80% 0, 80% 100%, 20% 100%)'
    ],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      ease: 'steps(5)'
    }
  }
};

/**
 * Custom animation variants for staggered pulse effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerPulseVariants = {
  initial: ({ delay }) => ({
    scale: 1,
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut', delay }
  }),
  animate: { scale: [1, 1.05, 1] }
};

/**
 * Custom animation variants for staggered spin effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerSpinVariants = {
  initial: ({ delay }) => ({
    rotate: 0,
    transition: { duration: 2, repeat: Infinity, ease: 'linear', delay }
  }),
  animate: { rotate: [0, 360] }
};

/**
 * Custom animation variants for staggered skew effect.
 * @type {{ initial: {}, animate: {} }}
 */
export const staggerSkewVariants = {
  initial: ({ delay }) => ({
    transform: 'skewX(0deg)',
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut', delay }
  }),
  animate: { transform: ['skewX(0deg)', 'skewX(-10deg)', 'skewX(0deg)'] }
};