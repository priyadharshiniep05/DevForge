// src/components/PortfolioSection.jsx

import React from 'react';
import { motion } from 'framer-motion';
import tw from 'tailwind-styled-components';

/**
 * PortfolioSection component for displaying portfolio categories.
 */
const PortfolioSection = () => {
  // Sample data for portfolio categories
  const portfolioCategories = [
    {
      id: 1,
      title: 'Photography',
      description:
        'A collection of my best photography works, showcasing various styles and techniques.',
      images: [
        '/images/photo1.jpg',
        '/images/photo2.jpg',
        '/images/photo3.jpg',
      ],
    },
    {
      id: 2,
      title: 'Illustration',
      description:
        'My digital illustrations, blending creativity with technology to bring ideas to life.',
      images: [
        '/images/illustration1.jpg',
        '/images/illustration2.jpg',
        '/images/illustration3.jpg',
      ],
    },
    {
      id: 3,
      title: 'Design',
      description:
        'A portfolio of my design projects, from branding to UI/UX designs.',
      images: [
        '/images/design1.jpg',
        '/images/design2.jpg',
        '/images/design3.jpg',
      ],
    },
  ];

  return (
    <SectionContainer id="portfolio">
      <Title>My Portfolio</Title>
      {portfolioCategories.map((category) => (
        <Category key={category.id}>
          <CategoryTitle>{category.title}</CategoryTitle>
          <CategoryDescription>{category.description}</CategoryDescription>
          <ImageGrid>
            {category.images.map((image, index) => (
              <ImageWrapper key={`image-${index}`}>
                <Image src={image} alt={`${category.title} - Image ${index + 1}`} />
              </ImageWrapper>
            ))}
          </ImageGrid>
        </Category>
      ))}
    </SectionContainer>
  );
};

export default PortfolioSection;

// Styled components using Tailwind CSS with BEM-like naming
const SectionContainer = tw(motion.section)`
  w-full
  px-8
  py-16
  bg-gray-100
  text-center
`;

const Title = tw.h2`
  text-3xl
  font-bold
  mb-8
`;

const Category = tw.div`
  mb-12
`;

const CategoryTitle = tw.h3`
  text-2xl
  font-semibold
  mb-4
`;

const CategoryDescription = tw.p`
  text-gray-600
  mb-8
`;

const ImageGrid = tw.div`
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-4
`;

const ImageWrapper = tw.div`
  overflow-hidden
  rounded-lg
  shadow-md
`;

const Image = tw.img`
  w-full
  h-auto
  transition-transform
  duration-300
  hover:scale-105
`;