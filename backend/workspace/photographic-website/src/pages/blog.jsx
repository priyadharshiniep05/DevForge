// src/pages/blog.jsx

import React, { useState, useEffect } from 'react';
import BlogSection from '../components/BlogSection';
import Head from 'next/head';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching blog posts from an API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog-posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Photographic Blog | Photography Tips and Articles</title>
        <meta
          name="description"
          content="Explore photography tips, techniques, and articles on our blog."
        />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <BlogSection posts={blogPosts} lazyLoad />
      </main>
    </>
  );
};

export default Blog;