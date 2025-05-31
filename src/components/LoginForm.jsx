import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SecondaryNavbar from "./SecondaryNavbar";
import "../styles/LoginForm.css";
import { VoiceContext } from "../context/VoiceContext";
import Webcam from "react-webcam";
import axios from "axios";

function LoginForm() {
  const { speak, language, handleNavigation } = useContext(VoiceContext);
  const webcamRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [hasInitialAnnouncement, setHasInitialAnnouncement] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      navigate(user.role === "admin" ? "/admin_dashboard" : "/agent_dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    if (!hasInitialAnnouncement) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const msg =
            language === "en-US"
              ? active
                ? "You are now on the agent login page. Please look at the camera for facial recognition."
                : "You are now on the admin login page. Please enter your credentials."
              : active
              ? "You are now on the agent login page. Please look at the camera for facial recognition."
              : "You are now on the admin login page. Please enter your credentials.";
          speak(msg);
          setHasInitialAnnouncement(true);
        }, 300);
      });
    }
  }, [speak, language, active, hasInitialAnnouncement]);

  const toggleForm = () => {
    setActive(!active);
    setRole(active ? "admin" : "agent");
    setError("");

    requestAnimationFrame(() => {
      const msg = !active
        ? "Switching to agent login. Please look at the camera for facial recognition."
        : "Switching to admin login. Please enter your credentials.";
      speak(msg);
    });
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {
      await handleNavigation(
        "/register?type=agent",
        "Welcome to Agent Registration. Please fill in your details and capture your face."
      );
      navigate("/register?type=agent");
    } catch (error) {
      console.error("Voice navigation error:", error);
      navigate("/register?type=agent");
    }
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #6a3de8, #512da8)",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 12px rgba(81, 45, 168, 0.2)",
    flex: 1,
    margin: "0 8px",
    minWidth: "140px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const buttonHoverStyle = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 15px rgba(81, 45, 168, 0.3)",
    background: "linear-gradient(135deg, #5c6bc0, #512da8)",
  };

  const handleAdminLogin = async () => {
    try {
      setLoading(true);
      setError("");

      speak("Attempting to log in. Please wait.");

      const response = await axios.post(
        "https://vinay0123-travis-login.hf.space/admin-login",
        { username: email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        await new Promise((resolve) => {
          const successMsg =
            language === "en-US"
              ? "Login successful. Welcome back, Admin."
              : "Login successful. Welcome back, Admin.";
          speak(successMsg);
          setTimeout(resolve, 1000);
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: email,
            role: "admin",
          })
        );
        navigate("/admin_dashboard");
      } else {
        const errorMsg =
          language === "en-US"
            ? "Invalid credentials. Please try again."
            : "Invalid credentials. Please try again.";
        speak(errorMsg);
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        language === "en-US"
          ? "Login failed. Please try again."
          : "Login failed. Please try again.";
      speak(errorMsg);
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAgentFaceLogin = async () => {
    try {
      setLoading(true);
      setError("");

      speak("Starting face recognition. Please look at the camera.");

      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        const errorMsg =
          language === "en-US"
            ? "Failed to capture image from webcam. Please try again."
            : "Failed to capture image from webcam. Please try again.";
        speak(errorMsg);
        throw new Error("Failed to capture image from webcam");
      }

      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      const formData = new FormData();
      formData.append("image", blob, "face.jpg");

      speak("Processing face recognition. Please wait.");

      const response = await axios.post(
        "https://vinay0123-travis-login.hf.space/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.name && response.data.name !== "user not recognised") {
        await new Promise((resolve) => {
          const successMsg =
            language === "en-US"
              ? "Face recognition successful. Welcome back, Agent."
              : "Face recognition successful. Welcome back, Agent.";
          speak(successMsg);
          setTimeout(resolve, 1000);
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: response.data.name,
            role: "agent",
          })
        );
        navigate("/agent_dashboard");
      } else {
        const errorMsg =
          language === "en-US"
            ? "Face recognition failed. Please try again."
            : "Face recognition failed. Please try again.";
        speak(errorMsg);
        setError("Face recognition failed. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        language === "en-US"
          ? "Login failed. Please try again."
          : "Login failed. Please try again.";
      speak(errorMsg);
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-shapes">
      <SecondaryNavbar />
      <div className={`container ${!active ? "active" : ""}`} id="container">
        <div className="form-container sign-in">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1
              style={{
                fontWeight: "700",
                marginBottom: "30px",
                color: "#333",
                fontSize: "28px",
              }}
            >
              {active ? "Agent Login" : "Admin Login"}
            </h1>

            {error && (
              <p
                className="error"
                style={{
                  color: "#ff3333",
                  marginBottom: "15px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {error}
              </p>
            )}

            <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
              {!active ? (
                // Admin Login Form
                <>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      marginBottom: "12px",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "16px",
                      backgroundColor: "#f7f7f7",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "16px",
                      backgroundColor: "#f7f7f7",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAdminLogin}
                    disabled={loading}
                    style={{
                      ...buttonStyle,
                      width: "100%",
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) =>
                      !loading &&
                      Object.assign(e.target.style, buttonHoverStyle)
                    }
                    onMouseLeave={(e) => {
                      e.target.style.transform = "none";
                      e.target.style.boxShadow = buttonStyle.boxShadow;
                      e.target.style.background = buttonStyle.background;
                    }}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </>
              ) : (
                // Agent Face Login
                <>
                  <div
                    className="webcam-container"
                    style={{ marginBottom: "20px" }}
                  >
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        width: 400,
                        height: 400,
                        facingMode: "user",
                      }}
                      style={{
                        width: "100%",
                        height: "250px",
                        borderRadius: "12px",
                        boxShadow: "0 6px 12px rgba(81, 45, 168, 0.1)",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAgentFaceLogin}
                    disabled={loading}
                    style={{
                      ...buttonStyle,
                      width: "100%",
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) =>
                      !loading &&
                      Object.assign(e.target.style, buttonHoverStyle)
                    }
                    onMouseLeave={(e) => {
                      e.target.style.transform = "none";
                      e.target.style.boxShadow = buttonStyle.boxShadow;
                      e.target.style.background = buttonStyle.background;
                    }}
                  >
                    {loading ? "Verifying..." : "Login with Face"}
                  </button>

                  {/* Registration link appears only in Agent Login mode */}
                  <p
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.3px",
                      color: "#555",
                    }}
                  >
                    Don't Have An Account?{" "}
                    <a
                      href="/register?type=agent"
                      onClick={handleRegisterClick}
                      style={{
                        color: "#6a3de8",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "14px",
                        marginLeft: "5px",
                      }}
                    >
                      Register
                    </a>
                  </p>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h2>Welcome Back Admin!</h2>
              <p>Login with your email and password.</p>
              <button
                className="hidden"
                onClick={toggleForm}
                style={{
                  background: "transparent",
                  border: "2px solid #fff",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
                }}
              >
                Not an Admin?
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Hello, Agent!</h2>
              <p>Use facial recognition to access your account.</p>
              <button
                className="hidden"
                onClick={toggleForm}
                style={{
                  background: "transparent",
                  border: "2px solid #fff",
                  boxShadow: "0 4px 10px rgba(255, 255, 255, 0.2)",
                }}
              >
                Not an Agent?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
