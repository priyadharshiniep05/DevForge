import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate fetching images from an API or a static source
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio images');
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching portfolio images:', error);
        // Handle error, e.g., show a placeholder or an error message
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={480}
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <h3 className="text-lg font-semibold">{image.title}</h3>
                <p className="text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;