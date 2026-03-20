// src/pages/contact.jsx

import React from 'react';
import Head from 'next/head';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title>Contact | Photographic Website</title>
        <meta name="description" content="Get in touch with the photographer for inquiries and bookings." />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="text-lg text-center mb-12">
          Feel free to reach out with any questions or inquiries. We'd love to hear from you!
        </p>

        <div className="max-w-md mx-auto">
          <ContactForm />
        </div>
      </main>
    </>
  );
};

export default ContactPage;