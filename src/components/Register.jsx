import React, { useState } from "react";
import "../styles/register.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SecondaryNavbar from './SecondaryNavbar';
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleRegister = async() => {
        if (!email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
          }
          
          if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
          }
          
          try {
            setLoading(true);
            setError('');
            
            // Send registration data to backend
            // The role is set to "agent" on the server side
            const response = await axios.post('http://localhost:5000/register', {
                email: email,
                password: password
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
                });
            
            console.log('Registration successful:', response.data);
            
            // Redirect to login page after successful registration
            if (response.data.success) {
                // Redirect to login page after successful registration
                navigate('/');
              } else {
                setError(response.data.message || 'Registration failed');
              }
            } catch (err) {
              console.error('Registration error details:', err);
              
              if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', err.response.data);
                setError(err.response.data.message || 'Registration failed');
              } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received:', err.request);
                setError('No response from server. Please try again later.');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Request setup error:', err.message);
                setError('Error making request: ' + err.message);
              }
            } finally {
              setLoading(false);
            }
    };
  
    return (
    <div className="background-shapes">
      <SecondaryNavbar />
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form>
            <h1>Agent Registration</h1>

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>
              Register
            </button>
            <p>
              Already Have An Account?
              <a href="/login">
                Login
              </a>
            </p>
          </form>
        </div>
  
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h2>Join Our Team!</h2>
              <p>Register as an agent with Travis..!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
  export default Register;
