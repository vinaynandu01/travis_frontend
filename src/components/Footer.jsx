import React, { useState } from "react";
import "../styles/Footer.css";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const startPosition = window.pageYOffset;
      const distance = elementPosition;
      const duration = 1200;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutCubic(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, scrollY);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      // Easing function for smoother animation
      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setMessage("");
    setIsSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    try {
      // Using the Flask API endpoint
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message,
          to: "Travisdrive2@gmail.com",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setIsSuccess(true);
      // Clear form after successful submission
      setEmail("");
      setMessage("");

      // Auto close after showing success message
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TRAVIS</h3>
            <p>
              Empowering visually impaired service agents with AI voice
              assistance.
            </p>
          </div>

          <div className="footer-section links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a
                  href="#models"
                  onClick={(e) => handleSmoothScroll(e, "models")}
                >
                  Models
                </a>
              </li>
              <li>
                <a
                  href="#about-project"
                  onClick={(e) => handleSmoothScroll(e, "about-project")}
                >
                  About Project
                </a>
              </li>
              <li>
                <a
                  href="#about-us"
                  onClick={(e) => handleSmoothScroll(e, "about-us")}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#documentation"
                  onClick={(e) => handleSmoothScroll(e, "documentation")}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="/login" rel="noopener noreferrer">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h4>Contact</h4>
            <p>Travisdrive2@gmail.com</p>
            <p>+91 9347030728</p>
            <button className="message-us-btn" onClick={openModal}>
              Message Us
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Travis. All rights reserved.</p>
          <div className="social-icons">
            <a href="/#" aria-label="GitHub">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="/#" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="/#" aria-label="LinkedIn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Send us a message</h3>
              <button className="close-btn" onClick={closeModal}>
                ×
              </button>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              {isSuccess ? (
                <div className="success-message">
                  <svg className="success-icon" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                  </svg>
                  <p>Message sent successfully!</p>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here..."
                      required
                    ></textarea>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button
                    type="submit"
                    className="send-btn"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
