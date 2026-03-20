// src/components/Gallery.jsx

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Gallery component to display a portfolio of images with lazy loading and smooth animations.
 */
const Gallery = () => {
  const [images, setImages] = useState([]);

  // Mock data for demonstration purposes
  useEffect(() => {
    setImages([
      '/gallery/image1.jpg',
      '/gallery/image2.jpg',
      '/gallery/image3.jpg',
      '/gallery/image4.jpg',
      '/gallery/image5.jpg',
    ]);
  }, []);

  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Our Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <Image
              src={src}
              alt={`Gallery Image ${index + 1}`}
              width={640}
              height={480}
              loading="lazy"
              className="w-full h-auto"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;