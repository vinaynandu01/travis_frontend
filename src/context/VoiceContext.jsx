import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const VoiceContext = createContext();

const VoiceNavigator = ({ speak, isSpeaking, messages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Reset navigation state when location changes
    setIsNavigating(false);
  }, [location]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.altKey) return;

      // Handle stop command first
      if (e.key.toLowerCase() === 'x') {
        window.speechSynthesis.cancel();
        requestAnimationFrame(() => {
          speak(messages.stop);
        });
        return;
      }

      // Don't process new commands if currently speaking or navigating
      if (isSpeaking || isNavigating) return;

      switch (e.key.toLowerCase()) {
        case 'h':
          setIsNavigating(true);
          navigate('/');
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            setTimeout(() => speak(messages.home), 300);
          });
          break;
        case 'l':
          setIsNavigating(true); 
          navigate('/login');
          requestAnimationFrame(() => {
            setTimeout(() => speak(messages.login.arrival), 300);
          });
          break;
        case 'r':
          setIsNavigating(true);
          navigate('/register?type=agent');
          requestAnimationFrame(() => {
            setTimeout(() => speak(messages.register.agentArrival), 300);
          });
          break;
        case 'j':
          speak(messages.help);
          break;
        default:
          return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate, location, isSpeaking, isNavigating, speak, messages]);

  return null;
};

export const VoiceProvider = ({ children }) => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      setVoicesLoaded(true);
    };

    // Check if voices are already available
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      loadVoices();
    } else if (window.speechSynthesis.onvoiceschanged !== undefined) {
      // Wait for voices to be loaded
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Core speak function with improved timing
  const speak = (text) => {
    if (!window.speechSynthesis || !voicesLoaded) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Use requestAnimationFrame to ensure smooth timing
    requestAnimationFrame(() => {
      const utter = new SpeechSynthesisUtterance(text);
      
      // Configure speech settings
      utter.lang = 'en-US';
      utter.rate = 0.9;  // Slightly slower for clarity
      utter.pitch = 1.0;
      utter.volume = 1.0;

      // Select the best available voice
      let selectedVoice = voices.find(
        v => v.lang === 'en-US' && !v.name.toLowerCase().includes('female')
      ) || voices.find(
        v => v.lang === 'en-US'
      ) || voices[0];

      if (selectedVoice) {
        utter.voice = selectedVoice;
      }

      // Handle speech events with proper cleanup
      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => {
        setIsSpeaking(false);
        window.speechSynthesis.cancel(); // Ensure cleanup
      };
      utter.onerror = () => {
        setIsSpeaking(false);
        window.speechSynthesis.cancel(); // Ensure cleanup on error
      };

      window.speechSynthesis.speak(utter);
    });
  };

  // Navigation handler with proper timing
  const handleNavigation = async (path, message) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Return a promise that resolves after the message is spoken
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        // Only speak the message
        speak(message);
        // Give enough time for the message to be processed
        setTimeout(resolve, 100);
      });
    });
  };

  // Voice command messages
  const messages = {
    welcome: 'Welcome to Travis. Use Alt H for home, Alt L for login, Alt R for registration, or Alt J for help.',
    home: 'You are at the Travis home page',
    login: {
      arrival: 'You are at the login page',
      success: 'Login successful. Welcome back',
      adminSuccess: 'Login successful. Welcome back, Administrator',
      agentSuccess: 'Face recognition successful. Welcome back, Agent',
      failed: 'Login failed. Please try again'
    },
    register: {
      adminArrival: 'You are at the admin registration page',
      agentArrival: 'You are at the agent registration page',
      success: 'Registration successful. You can now login',
      failed: 'Registration failed. Please try again'
    },
    help: 'Available commands: Alt H for home, Alt L for login, Alt R for registration, Alt J for help, and Alt X to stop voice',
    stop: 'Voice stopped',
    faceCapture: {
      start: 'Starting face capture. Please look at the camera',
      success: 'Face capture successful',
      failed: 'Face capture failed. Please try again'
    }
  };

  // Initial welcome message with improved timing
  useEffect(() => {
    if (!hasWelcomed && voicesLoaded) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          speak(messages.welcome);
          setHasWelcomed(true);
        }, 1000);
      });
    }
  }, [hasWelcomed, voicesLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ speak, isSpeaking, messages, handleNavigation }}>
      <VoiceNavigator speak={speak} isSpeaking={isSpeaking} messages={messages} />
      {children}
    </VoiceContext.Provider>
  );
};
