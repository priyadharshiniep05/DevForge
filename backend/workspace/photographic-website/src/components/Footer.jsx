// src/components/Footer.jsx

import React from 'react';

/**
 * Footer component for the photographic website.
 * Contains social media icons and copyright notice.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M19 2h-10c-1.1 0-2 .9-2 2v3h2V4h3v10h-3v3h5v-3h-2V20c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M23.954 4.569c-.885.387-1.83.654-2.825.775 1.032-.611 1.799-1.574 2.169-2.723-.951.566-2.009.976-3.127 1.29.832-.548 1.516-1.278 1.947-2.077-.84.534-1.71 0.98-2.69 1.202.754-.819 1.278-1.952 1.278-3.285 0-2.315-1.885-4.198-4.198-4.198S4.602 1.983 4.602 4.298c0 .37.042.736.12.985C3.08 3.003 2.076 2.323 1.06 1.13-.376.848.532 1.378 1.814 1.093c.756-.254 1.459-.996 1.459-1.983s-.703-1.729-1.777-1.945C.469.254 0 .95 0 1.704c0 1.106.806 2.002 1.84 2.307-.186-.896-.698-1.517-1.46-2.013v.08c0 1.567.806 2.943 2.066 3.701-.2-.05-.39-.1-.58-.1-.29.006-.58.084-.86.24c-.29-.533-.487-1.135-.487-1.807 0-.37.147-.713.42-.981A.59.59 0 012 1.523c-.547.316-1 .976-1 1.845 0 1.321.839 2.457 1.988 2.827-.727.22-.839.815-.07 1.135.77.35 1.614.558 2.096.56.845 0 1.574-.288 2.096-.83.524.373.948.83 1.307 1.202-.362.414-.813.68-1.307.81 1.093.358 2.1.606 3.127.77-.415-.356-.754-.858-1.093-1.484.733.376 1.563.649 2.457.703-.814-.894-1.906-2.148-1.906-3.98 0-.894.319-1.72 .871-2.332C8.537 10.988 9.82 10 11.25 10c1.43 0 2.7.868 3.006 2.013.071-.204.276-.338.495-.338.118 0 .219.034.307.084a1.093 1.093 0 01.643 1.078c-.363.084-.668.254-.975.46-1.389-.316-2.743-.748-4.038-1.203z" />
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M7.8 2h8.4c.4 0 .7.3.7.7v18.6c0 .4-.3.7-.7.7H7.8c-.4 0-.7-.3-.7-.7V2.7c0-.4.3-.7.7-.7zm-4.5 2h16c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H3.3c-1.1 0-2-.9-2-2V4.7c0-1.1.9-2 2-2zm8.5 15.1c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4-2.4 1.1-2.4 2.4 1.1 2.4 2.4 2.4z" />
              <circle cx="8.5" cy="8.5" r="4.5" />
            </svg>
          </a>
        </div>

        {/* Copyright Notice */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Photographic Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;