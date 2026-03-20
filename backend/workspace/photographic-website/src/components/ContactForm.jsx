// src/components/ContactForm.jsx

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * ContactForm component allows visitors to contact the photographer through a form.
 */
const ContactForm = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters long')
      .required('Message is required'),
  });

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Simulate sending the form data to a server
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitSuccess(true);
        formik.resetForm();
      } catch (error) {
        setSubmitError('Failed to send message. Please try again later.');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      {submitSuccess && (
        <div className="bg-green-100 text-green-700 p-2 mb-4" role="alert">
          Message sent successfully!
        </div>
      )}
      {submitError && (
        <div className="bg-red-100 text-red-700 p-2 mb-4" role="alert">
          {submitError}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            formik.touched.name && formik.errors.name ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="4"
          className={`w-full px-3 py-2 border rounded ${
            formik.touched.message && formik.errors.message ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.message && formik.errors.message && (
          <div className="text-red-500 text-sm">{formik.errors.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;