import React, { useState, useEffect } from 'react';

/**
 * DarkModeToggle component that allows users to switch between light and dark themes.
 */
const DarkModeToggle = () => {
  // State to track the current theme mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Function to toggle the theme mode.
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  /**
   * Effect to apply the saved theme on component mount.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Apply the theme class to the body
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded"
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;