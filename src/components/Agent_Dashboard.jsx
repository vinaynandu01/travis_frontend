import React, { useEffect, useState } from "react";
import styles from "../styles/AgentDashboard.module.css";
const API_URL = "https://vinay0123-final-model.hf.space"
function AgentDashboard() {
  const [messages, setMessages] = useState([
    { text: "Welcome To Travis Input Your Query..!", user: false }
  ]);
  const [input, setInput] = useState("");
  const [intents, setIntents] = useState([]);
  const [latestTelugu, setLatestTelugu] = useState("");
  const [isListening, setIsListening] = useState(false);
  
  // Fetch intents on load
  useEffect(() => {
    const fetchIntents = async () => {
      try {
        const res = await fetch(`${API_URL}/intent`);
        const data = await res.json();
        
        const rawIntents = data.intents || [];
        
        const parsed = rawIntents
          .filter((name) => typeof name === "string" && name.trim() !== "")
          .map((name, index) => ({
            id: index,
            name: name
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
          }));
        
        setIntents(parsed);
      } catch (err) {
        console.error("Failed to fetch intents", err);
        setIntents([{ id: -1, name: "⚠️ Failed to load intents" }]);
      }
    };
    
    fetchIntents();
  }, []);
  
  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = input.trim();
      setMessages(prev => [...prev, { text: userMessage, user: true }]);
      setInput("");
      
      try {
        const res = await fetch(`${API_URL}/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: userMessage })
        });
        
        const data = await res.json();
        // const botReply = data.telugu;
        
        setMessages(prev => [...prev, { text: `English: ${data.english}\n\nTelugu: ${data.telugu}`, user: false }]);
        setLatestTelugu(data.telugu); 
      } catch (err) {
        console.error("Failed to fetch response", err);
        setMessages(prev => [
          ...prev,
          { text: "⚠️ Something went wrong getting a response.", user: false }
        ]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
      
  const playAudio = async () => {
    if (!latestTelugu) return;
    
    try {
      const response = await fetch(`${API_URL}/audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: latestTelugu })
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.playbackRate = 1.35;
      audio.play();
    } catch (error) {
      console.error("Audio fetch/play failed:", error);
    }
  };

  const startSpeechRecognition = () => {
    setIsListening(true);
    
    try {
      // Check if the Web Speech API is available
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onresult = (event) => {
          const speechResult = event.results[0][0].transcript;
          setInput(speechResult);
          setIsListening(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        alert("Speech recognition is not supported in your browser. Try using a different browser or input text manually.");
        setIsListening(false);
      }
    } catch (error) {
      console.error("Speech recognition failed:", error);
      setIsListening(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className={styles.agentDashboard}>
      {/* Sidebar on the left */}
      <div className={styles.sidebar}>
        <h1 className={styles.dashboardTitle}>TRAVIS</h1>
        <h2 className={styles.intentsTitle}>Available Intents</h2>
        <ul className={styles.intentsList}>
          {intents.length > 0 ? (
            intents
              .filter((intent) => intent.name && typeof intent.name === "string")
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((intent) => (
                <li key={intent.id} className={styles.intentItem}>• {intent.name}</li>
              ))
          ) : (
            <li className={styles.intentItem}>⚠️ No intents available</li>
          )}
        </ul>
        
        <button 
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Chat area on the right */}
      <div className={styles.chatArea}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <p 
              key={index} 
              className={`${styles.message} ${msg.user ? styles.userMessage : ""}`}
            >
              {msg.text}
            </p>
          ))}
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.inputGroup}>
            <button 
              className={styles.audioBtn} 
              onClick={playAudio} 
              title="Play Audio"
            >
              🔊
            </button>
            <input
              type="text"
              placeholder="Ask here..."
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className={`${styles.micBtn} ${isListening ? styles.listening : ''}`} 
              onClick={startSpeechRecognition} 
              title="Voice Input (Windows + H)"
            >
              <svg className={styles.micIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            <button 
              className={styles.sendBtn} 
              onClick={handleSendMessage} 
              title="Send Message"
            >
              <svg className={styles.sendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentDashboard;