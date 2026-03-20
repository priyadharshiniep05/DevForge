import React, { useState } from 'react';
import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

/**
 * Header component for the navigation bar at the top of each page.
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the mobile menu open/close state.
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 fixed w-full z-50">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo or Site Title */}
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
          PhotoSite
        </Link>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
          <Link href="/about" className="text-gray-800 dark:text-white hover:text-gray-600">
            About
          </Link>
          <Link href="/blog" className="text-gray-800 dark:text-white hover:text-gray-600">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-800 dark:text-white hover:text-gray-600">
            Contact
          </Link>
        </div>

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </nav>
    </header>
  );
};

export default Header;