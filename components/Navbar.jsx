'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import './navbar.css';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = ({ showHomeOnly = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close menu after scrolling
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative flex items-center`}
    >
      <div className="absolute w-[50%] " />
      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center `}>
        
        {/* Logo Image */}
        <div className="logo-container">
          <img src="/pf_logo12.png" alt="Pathfinder Logo" className="logo-image" />
        </div>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navbar buttons for large screens */}
        <div className="hidden lg:flex space-x-4 gap-10" >
          {showHomeOnly ? (
            <Link href="/" passHref>
              <button className="ordbut text-white hover:text-gray-300">Home</button>
            </Link>
          ) : (
            <>
              <button onClick={() => handleScrollToSection('about-section')} className="ordbut text-white hover:text-gray-300">About</button>
              <Link href="/team" passHref>
                <button className="teambut pt-3 text-white hover:text-gray-300">Team</button>
              </Link>
              <button onClick={() => handleScrollToSection('explore')} className="ordbut text-white hover:text-gray-300">Events</button>
              <button onClick={() => handleScrollToSection('contact')} className="glow-button">REGISTER NOW</button>
            </>
          )}
        </div>

        {/* Overlay and Mobile menu */}
        {isOpen && (
          <>
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50 z-30"
              onClick={toggleMenu} // Closes menu if clicking outside of it
            ></div>
            
            {/* Mobile menu */}
            <div className="lg:hidden fixed top-20 right-0 w-full bg-violet-900 shadow-lg p-5 z-40">
              {showHomeOnly ? (
                <Link href="/" passHref>
                  <button onClick={toggleMenu} className="block w-full py-2 text-white text-left hover:text-gray-300">Home</button>
                </Link>
              ) : (
                <>
                  <button onClick={() => handleScrollToSection('about-section')} className="block w-full py-2 text-white text-left hover:text-gray-300">About</button>
                  <Link href="/team" passHref>
                    <button onClick={toggleMenu} className="block w-full py-2 text-white text-left hover:text-gray-300">Team</button>
                  </Link>
                  <button onClick={() => handleScrollToSection('explore')} className="block w-full py-2 text-white text-left hover:text-gray-300">Events</button>
                  <button onClick={() => handleScrollToSection('contact')} className="block w-full py-2 glow-button">REGISTER NOW</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
