import React from 'react';
import { motion } from 'framer-motion';

/**
 * PhotoGallery component for displaying an interactive photo gallery with hover effects.
 *
 * @returns {JSX.Element} - The PhotoGallery component.
 */
const PhotoGallery = () => {
  // Sample photos data
  const photos = [
    {
      id: 1,
      src: 'https://via.placeholder.com/300',
      alt: 'Photo 1',
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/300',
      alt: 'Photo 2',
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/300',
      alt: 'Photo 3',
    },
    // Add more photos as needed
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="relative overflow-hidden rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-auto" />
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-lg font-semibold">View Photo</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;