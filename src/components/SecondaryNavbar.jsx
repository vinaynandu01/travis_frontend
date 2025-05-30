import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { VoiceContext } from '../context/VoiceContext';

const SecondaryNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { handleNavigation, messages } = useContext(VoiceContext);

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

  const handleHomeClick = async (e) => {
    e.preventDefault();
    setMenuOpen(false);
    
    try {
      // First announce the home message
      await handleNavigation('/', 'You are at the Travis home page');
      // Then navigate after the announcement has started
      navigate('/');
    } catch (error) {
      // If there's an error with the voice, still navigate
      console.error('Voice navigation error:', error);
      navigate('/');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a 
            href="/" 
            onClick={handleHomeClick}
          >
            TRAVIS
          </a>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="/" 
              className="get-started-btn"
              onClick={handleHomeClick}
            >
              Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SecondaryNavbar;
