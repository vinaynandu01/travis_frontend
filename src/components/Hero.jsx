import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Transformer-Based Help Desk
          <span className="highlight"> for Visually Impaired Service Agents</span>
        </h1>
        <p className="hero-subtitle">
          AI-powered voice assistance platform for empowering visually impaired bank agents.
        </p>
        <div className="hero-cta">
          <a href="#models" className="cta-button">Learn More</a>
          <a href="https://example.com" className="cta-button secondary" target="_blank" rel="noopener noreferrer">Get Access</a>
        </div>
      </div>
      <div className="hero-illustration">
        <div className="illustration-container">
          <div className="illustration-shape shape-1"></div>
          <div className="illustration-shape shape-2"></div>
          <div className="illustration-shape shape-3"></div>
          <div className="illustration-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2a3 3 0 0 0-3 3v7h6V5a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="22"></line>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;