import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "../styles/LoginForm.css"; // Import your CSS file for styling
import SecondaryNavbar from './SecondaryNavbar';
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin"); // Default role is admin
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        navigate(user.role === "admin" ? "/admin_dashboard" : "/agent_dashboard");
      }
    }, [navigate]);
  
    const toggleForm = () => {
      setActive(!active);
      setRole(active ? "admin" : "agent");
    };
  
    const handleLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });
  
        const data = await res.json();
        if (data.success) {
          localStorage.setItem('user', JSON.stringify({
            email,
            role: data.role
          }));
  
          navigate(data.role === "admin" ? "/admin_dashboard" : "/agent_dashboard");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed");
      }
    };
  
    return (
      
    <div className="background-shapes">
      <SecondaryNavbar/>
      <div className={`container ${active ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form>
            <h1 className="heading">{active ? "Admin Login" : "Agent Login"}</h1>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin}>Sign In</button>
          </form>
        </div>
  
        <div className="form-container sign-in">
          <form>
            <h1>{active ? "Admin Login" : "Agent Login"}</h1>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={handleLogin}>Sign In</button>
            <p>
              Don't Have An Account?
              <a href="/register">Register</a>
            </p>
          </form>
        </div>
  
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h2>Welcome Back Admin!</h2>
              <p>Login with your credentials..!</p>
              <button className="hidden" onClick={toggleForm}>Not An Admin?</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Hello, Agent!</h2>
              <p>Welcome to Travis ..!</p>
              <button className="hidden" onClick={toggleForm}>Not An Agent?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  export default LoginForm;