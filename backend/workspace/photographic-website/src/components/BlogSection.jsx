import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching blog posts from an API
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: 'Top Photography Tips for Beginners',
          image: '/images/blog/post1.jpg',
          excerpt:
            'Learn the basics of photography and improve your skills with these essential tips.',
        },
        {
          id: 2,
          title: 'Mastering Light in Photography',
          image: '/images/blog/post2.jpg',
          excerpt:
            'Discover how light affects your photos and techniques to control it.',
        },
        {
          id: 3,
          title: 'Post-Processing Techniques for Stunning Images',
          image: '/images/blog/post3.jpg',
          excerpt:
            'Enhance your photos with professional post-processing tips and tools.',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-24 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Blog</h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link href={`/blog/${post.id}`}>
              <a>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </a>
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default BlogSection;