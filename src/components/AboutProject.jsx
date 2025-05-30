import React from 'react';
import '../styles/AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <div className="section-container">
        <h2 className="section-title">About The Project</h2>
        <div className="divider"></div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Transformer Based Help Desk for Visually Impaired Service Agents with voice assistance 
              integrated project aims to design and implement a transformer-based AI system developed 
              from scratch that enables visually impaired bank representatives to handle customer queries efficiently.
            </p>
            <p>
              The system will process input queries, classify them into standardized categories,
              and generate appropriate responses. It will also provide voice assistance to help the
              representative understand the queries and responses. The system will be able to 
              translate responses into local languages, and convert them into speech for the 
              representative to communicate.
              
            </p>
            <p>
              It focuses on empowering visually impaired bank agent/representative to provide 
              accurate, timely responses using advanced transformer-based models.
            </p>
          </div>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <h3>Query Processing</h3>
              <p>Advanced NLP to understand and categorize customer queries</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h3>Voice Integration</h3>
              <p>Text-to-speech conversion for accessible communication</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Language Translation</h3>
              <p>Telugu language support for diverse customer interactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;