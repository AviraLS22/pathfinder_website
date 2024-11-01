'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import './navbar.css';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const handleScrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative flex items-center`} // Center align items vertically
    >
      <div className="absolute w-[50%]" />
      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center `}>
        {/* Logo Image */}
        <div className="logo-container">
          <img src="/pf_logo12.png" alt="Pathfinder Logo" className="logo-image " />
        </div>

        <div className="navbut">
          <button
            onClick={() => handleScrollToSection('about-section')}
            className="ordbut text-white hover:text-gray-300"
          >
            About
          </button>

          {/* Use Link for Team page navigation */}
          <Link href="/team" passHref>
            <button className="teambut pt-3  text-white hover:text-gray-300">
              Team
            </button>
          </Link>

          <button
            onClick={() => handleScrollToSection('explore')}
            className="ordbut text-white hover:text-gray-300"
          >
            Events
          </button>
          <button
            onClick={() => handleScrollToSection('contact')}
            className="glow-button "
          >
            REGISTER NOW
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
