import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AdminDashboard from "./components/Admin_Dashboard";
import AgentDashboard from "./components/Agent_Dashboard";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from './components/LoginForm';
// Landing Page Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutProject from './components/AboutProject';
import AboutUs from './components/About';
import Documentation from './components/Documentation';
import Footer from './components/Footer';
import Models from './components/Models';
import './styles/LandingApp.css';

// LoginForm Component


// Landing Page Wrapper
function LandingPage() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="landing-app">
      <Navbar />
      <main>
        <Hero />
        <Models />
        <AboutProject />
        <AboutUs />
        <Documentation />
      </main>
      <Footer />
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/models" element={<Models />} />
        <Route
          path="/admin_dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent_dashboard"
          element={
            <ProtectedRoute requiredRole="agent">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
