// src/pages/index.jsx
import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import Gallery from '../components/Gallery';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Photographic Website</title>
        <meta name="description" content="Welcome to our photographic website. Explore our hero section and portfolio gallery." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Portfolio Gallery */}
        <Gallery />
      </main>
    </>
  );
};

export default HomePage;