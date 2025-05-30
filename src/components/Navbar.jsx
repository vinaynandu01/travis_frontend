import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { VoiceContext } from '../context/VoiceContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { handleNavigation } = useContext(VoiceContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleGetStarted = async (e) => {
    e.preventDefault();
    setMenuOpen(false);
    try {
      // First announce the navigation
      await handleNavigation('/login', 'You are at the login page. Please look at the camera for facial recognition.');
      // Then navigate after the announcement has started
      navigate('/login');
    } catch (error) {
      // If there's an error with the voice, still navigate
      console.error('Voice navigation error:', error);
      navigate('/login');
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <span>TRAVIS</span>
        </div>
        
        <div 
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li><a href="#models" onClick={(e) => handleNavClick(e, '#models')}>Models</a></li>
          <li><a href="#about-project" onClick={(e) => handleNavClick(e, '#about-project')}>About Project</a></li>
          <li><a href="#about-us" onClick={(e) => handleNavClick(e, '#about-us')}>About Us</a></li>
          <li><a href="#documentation" onClick={(e) => handleNavClick(e, '#documentation')}>Documentation</a></li>
          <li>
            <a 
              href="/login" 
              className="get-started-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;