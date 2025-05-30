import React, { useState, useEffect, useRef } from "react";
import "../styles/Models.css";

const Models = () => {
  const [activeModel, setActiveModel] = useState("translation");
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChatModel, setActiveChatModel] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modelsRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatMessagesRef = useRef(null);
  
  // Configure the backend API URL - change this to match your Flask server
  // const API_URL = "https://vinay0123-final-model.hf.space";
  const API_URL = "http://192.168.0.176:5000";

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#models" && modelsRef.current) {
        setTimeout(() => {
          window.scrollTo({
            top: modelsRef.current.offsetTop - 80,
            behavior: 'smooth'
          });
        }, 100);
      }
    };

    if (window.location.hash === "#models" && modelsRef.current) {
      setTimeout(() => {
        window.scrollTo({
          top: modelsRef.current.offsetTop - 80,
          behavior: 'smooth'
        });
      }, 100);
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [chatOpen]);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleButtonClick = (model) => {
    setActiveModel(model);
  };

  const openChat = (model) => {
    setActiveChatModel(model);
    setChatOpen(true);
    setMessages([
      {
        sender: "system",
        text: model === "translation" 
          ? "Welcome to the Translation Model demo. Enter text to translate to Telugu." 
          : "Welcome to the Response Generation Model demo. Ask me anything!"
      }
    ]);
  };

  const closeChat = () => {
    setChatOpen(false);
    setMessages([]);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = { sender: "user", text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let response;
      
      if (activeChatModel === "translation") {
        // Call translation API
        response = await fetch(`${API_URL}/translate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: userMessage.text }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setMessages(prev => [...prev, { 
            sender: "system", 
            text: `English: ${data.english}\n\nTelugu: ${data.telugu}` 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            sender: "system", 
            text: `Error: ${data.error || 'Failed to translate text'}` 
          }]);
        }
      } else {
        // Call response generation API
        response = await fetch(`${API_URL}/en_response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: userMessage.text }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setMessages(prev => [...prev, { 
            sender: "system", 
            text: data.response 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            sender: "system", 
            text: `Error: ${data.error || 'Failed to generate response'}` 
          }]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        sender: "system", 
        text: `Connection error. Please try again later.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="models" ref={modelsRef} className="models-page-container">
      <h1 className="models-page-title">Our AI Models</h1>
      
      <div className="models-page-content">
        <div className="models-tree">
          <div className="models-root-node">
            <div className="models-root-label">Mixed Models</div>
            <div className="models-branches">
              <div className="models-branch models-left-branch"></div>
              <div className="models-branch models-right-branch"></div>
            </div>
            <div className="models-leaf-nodes">
              <button 
                className={`models-button models-button-translation ${activeModel === "translation" ? "models-button-active" : ""}`}
                onClick={() => handleButtonClick("translation")}
              >
                Translation Models
              </button>
              <button 
                className={`models-button models-button-response ${activeModel === "response" ? "models-button-active" : ""}`}
                onClick={() => handleButtonClick("response")}
              >
                Response Generation Models
              </button>
            </div>
          </div>
        </div>
        
        <div className="models-details">
          {activeModel === "translation" && (
            <div className="models-details-card models-translation-details">
              <div className="models-details-header">
                <h2>Translation Model</h2>
                <button 
                  className="models-demo-button"
                  onClick={() => openChat("translation")}
                >
                  Try Demo
                </button>
              </div>
              <p>Our advanced translation models provide accurate and contextually relevant translations for Domain Specific (Banking Queries) sentences between English and Telugu.</p>
              <div className="models-features">
                <div className="models-feature">
                  <h3>Telugu Support</h3>
                  <p>Specialized in English to Telugu translation with high accuracy.</p>
                </div>
                <div className="models-feature">
                  <h3>Context Awareness</h3>
                  <p>Understands context of the responses for more natural translations.</p>
                </div>
                <div className="models-feature">
                  <h3>Technical Specialization</h3>
                  <p>Domain-specific translation for Banking related Queries.</p>
                </div>
              </div>
            </div>
          )}
          
          {activeModel === "response" && (
            <div className="models-details-card models-response-details">
              <div className="models-details-header">
                <h2>Response Generation Model</h2>
                <button 
                  className="models-demo-button"
                  onClick={() => openChat("response")}
                >
                  Try Demo
                </button>
              </div>
              <p>Our intelligent response generation models understand the context of banking-related queries to deliver accurate responses.They provide highly relevant and personalized responses.</p>
              <div className="models-features">
                <div className="models-feature">
                  <h3>Accurate Responses</h3>
                  <p>Understands user queries within context to provide precise and meaningful answers.</p>
                </div>
                <div className="models-feature">
                  <h3>Intent Recognition</h3>
                  <p>Understands the purpose behind each query to provide targeted assistance.</p>
                </div>
                <div className="models-feature">
                  <h3>Natural Language Output</h3>
                  <p>Delivers responses in fluent, easy-to-understand English suitable for users.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Window Overlay */}
      {chatOpen && (
        <div className="models-chat-overlay">
          <div className="models-chat-backdrop" onClick={closeChat}></div>
          <div className="models-chat-window">
            <div className="models-chat-header">
              <h3>{activeChatModel === "translation" ? "Translation Demo" : "Response Generation Demo"}</h3>
              <button className="models-close-button" onClick={closeChat}>×</button>
            </div>
            <div className="models-chat-messages" ref={chatMessagesRef}>
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`models-message ${message.sender === "user" ? "models-user-message" : "models-system-message"}`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              ))}
              {isLoading && (
                <div className="models-message models-system-message">
                  <div className="models-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
            </div>
            <div className="models-chat-input-container">
              <textarea
                ref={chatInputRef}
                className="models-chat-input"
                placeholder={activeChatModel === "translation" ? "Enter text to translate to Telugu..." : "Ask me anything..."}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              ></textarea>
              <button 
                className="models-send-button" 
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ""}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Models;