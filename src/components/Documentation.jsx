import React from 'react';
import '../styles/Documentation.css';

const Documentation = () => {
  const docs = [
    {
      title: "API Reference",
      description: "Complete guide to our REST API endpoints, request formats, and response structures.",
      icon: "code"
    },
    {
      title: "Model Architecture",
      description: "Technical deep-dive into the transformer-based architecture powering our solution.",
      icon: "layers"
    },
    {
      title: "Voice Integration",
      description: "Implementation guide for text-to-speech and speech-to-text capabilities.",
      icon: "mic"
    },
    {
      title: "Usage Guidelines",
      description: "Best practices for deploying and utilizing the platform for optimal results.",
      icon: "file-text"
    },
    {
      title: "Accessibility Features",
      description: "Detailed overview of accessibility components and configurations.",
      icon: "eye"
    },
    {
      title: "Deployment Guide",
      description: "Step-by-step instructions for installing and configuring the system.",
      icon: "server"
    }
  ];

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'layers':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
      case 'mic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        );
      case 'file-text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        );
      case 'eye':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
      case 'server':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="documentation" className="documentation">
      <div className="section-container">
        <h2 className="section-title">Documentation</h2>
        <div className="divider"></div>
        
        <div className="docs-grid">
          {docs.map((doc, index) => (
            <div className="doc-card" key={index}>
              <div className="doc-icon">
                {getIcon(doc.icon)}
              </div>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <a href="/#" className="doc-link">View Details</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentation;