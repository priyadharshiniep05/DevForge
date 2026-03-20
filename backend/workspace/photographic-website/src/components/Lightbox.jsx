import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Lightbox component for viewing images in a modal.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.src - The source URL of the image to display.
 * @returns {JSX.Element} - The Lightbox component.
 */
const Lightbox = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Opens the lightbox modal.
   */
  const openLightbox = () => {
    setIsOpen(true);
  };

  /**
   * Closes the lightbox modal.
   */
  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={openLightbox} className="cursor-pointer">
        <img src={src} alt="Gallery" className="w-full h-auto rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <motion.img
            src={src}
            alt="Lightbox"
            className="max-w-full max-h-full object-contain cursor-pointer"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Lightbox;