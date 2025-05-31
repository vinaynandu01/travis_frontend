import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";
import SecondaryNavbar from "./SecondaryNavbar";
import "../styles/register.css";
import { VoiceContext } from "../context/VoiceContext";

function Register() {
  const { speak, language } = useContext(VoiceContext);
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [hasInitialAnnouncement, setHasInitialAnnouncement] = useState(false);
  const location = useLocation();
  const isAgent = new URLSearchParams(location.search).get("type") === "agent";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: isAgent ? "agent" : "admin",
  });
  const navigate = useNavigate();

  // Webcam configuration
  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
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

  // Initial welcome message with improved timing
  useEffect(() => {
    if (!hasInitialAnnouncement) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const welcomeMessage = isAgent
            ? "Welcome to Agent Registration. Please fill in your details and capture your face."
            : "Welcome to Admin Registration. Please fill in your details.";
          speak(welcomeMessage);
          setHasInitialAnnouncement(true);
        }, 300);
      });
    }
  }, [speak, language, isAgent, hasInitialAnnouncement]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateDetails = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      speak("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      speak("Email is required");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      speak("Password is required");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required");
      speak("Phone number is required");
      return false;
    }
    return true;
  };

  const handleProceedToCamera = () => {
    if (validateDetails()) {
      setError("");
      setShowCamera(true);
      requestAnimationFrame(() => {
        speak("Please look at the camera to capture your face images.");
      });
    }
  };

  const handleEditDetails = () => {
    setShowCamera(false);
    setCapturedImages([]);
    requestAnimationFrame(() => {
      speak("Returning to edit your details.");
    });
  };

  const captureImages = async () => {
    try {
      setIsCapturing(true);
      speak("Starting face capture. Please maintain a steady position.");

      let images = [];
      for (let i = 0; i < 7; i++) {
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            speak(`Capturing image ${i + 1} of 7`);
            setTimeout(resolve, 500);
          });
        });

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          throw new Error("Failed to capture image");
        }
        images.push(imageSrc);
      }

      setCapturedImages(images);
      speak("Face capture completed successfully.");
    } catch (err) {
      speak("Failed to capture images. Please try again.");
      setError("Failed to capture images. Please try again.");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleRegister = async () => {
    if (!validateDetails()) return;

    if (isAgent && capturedImages.length === 0 && showCamera) {
      const errorMsg = "Please capture your facial images first";
      setError(errorMsg);
      speak(errorMsg);
      return;
    }

    try {
      setLoading(true);
      setError("");
      speak("Processing registration. Please wait.");

      const submitFormData = new FormData();

      // Add user details
      Object.keys(formData).forEach((key) => {
        submitFormData.append(key, formData[key]);
      });

      // Add images only for agent registration
      if (isAgent && capturedImages.length > 0) {
        speak("Processing face images.");
        capturedImages.forEach((image, index) => {
          const byteString = atob(image.split(",")[1]);
          const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          submitFormData.append(`image${index}`, blob, `face_${index}.jpg`);
        });
      }

      const response = await axios.post(
        "https://vinay0123-travis-login.hf.space/register",
        submitFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "User registered successfully!") {
        // Wait for success message before navigation
        await new Promise((resolve) => {
          const successMsg =
            language === "en-US"
              ? isAgent
                ? "Registration completed successfully. Your face has been registered. You can now login using facial recognition."
                : "Registration completed successfully. You can now login with your username and password."
              : "Registration completed successfully. You can now login with your username and password.";
          speak(successMsg);
          setTimeout(resolve, 1500); // Give more time for longer message
        });
        navigate("/login");
      } else {
        const errorMsg =
          language === "en-US"
            ? "Registration failed. Please try again."
            : "Registration failed. Please try again.";
        speak(errorMsg);
        setError(response.data.error || "Registration failed");
      }
    } catch (err) {
      const errorMsg =
        language === "en-US"
          ? "Registration failed. Please try again."
          : "Registration failed. Please try again.";
      speak(errorMsg);
      console.error(err);
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-shapes">
      <SecondaryNavbar />
      <div
        className={`container ${isAgent ? "active" : ""}`}
        id="container"
        style={{
          width: "100%",
          maxWidth: "850px",
          minHeight: "420px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.35)",
          position: "relative",
          overflow: "hidden",
          margin: "1rem auto",
          display: "flex",
        }}
      >
        {/* Purple Panel - Left for agent, hidden for admin */}
        {isAgent && (
          <div
            style={{
              width: "50%",
              background: "linear-gradient(135deg, #6a3de8, #512da8)",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "12px",
                letterSpacing: "0.5px",
              }}
            >
              Hello, Agent!
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                maxWidth: "320px",
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: "12px",
              }}
            >
              Use facial recognition to create your account and access our
              platform designed for visually impaired agents.
            </p>
          </div>
        )}

        {/* Form Container */}
        <div
          style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            {isAgent ? "Agent Registration" : "Admin Registration"}
          </h1>

          {error && (
            <p
              style={{
                color: "#ff3333",
                marginBottom: "10px",
                fontSize: "13px",
                fontWeight: "500",
              }}
            >
              {error}
            </p>
          )}

          {!showCamera ? (
            <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#f7f7f7",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#f7f7f7",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#f7f7f7",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  marginBottom: "12px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#f7f7f7",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
              />
              <button
                onClick={isAgent ? handleProceedToCamera : handleRegister}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#6a3de8",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginBottom: "12px",
                  transition: "all 0.3s ease",
                }}
              >
                {isAgent ? "Continue to Face Capture" : "Complete Registration"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  color: "#666",
                  fontSize: "13px",
                }}
              >
                Already Have An Account?{" "}
                <a
                  href="/login"
                  style={{
                    color: "#6a3de8",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Login Here
                </a>
              </p>
            </div>
          ) : (
            <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
              <button
                onClick={handleEditDetails}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  marginBottom: "10px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#6a3de8",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Back to Details
              </button>

              <div
                style={{
                  marginBottom: "10px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "200px",
                  backgroundColor: "#f7f7f7",
                }}
              >
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 400,
                    height: 200,
                    facingMode: "user",
                  }}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              </div>

              {capturedImages.length > 0 && (
                <p
                  style={{
                    color: "#6a3de8",
                    marginBottom: "10px",
                    fontSize: "13px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {capturedImages.length} facial images captured successfully!
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={captureImages}
                  disabled={isCapturing}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "none",
                    borderRadius: "12px",
                    background: "#6a3de8",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    opacity: isCapturing ? 0.7 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {isCapturing ? "Capturing..." : "Capture Face Images"}
                </button>

                <button
                  onClick={handleRegister}
                  disabled={loading || capturedImages.length === 0}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    border: "none",
                    borderRadius: "12px",
                    background: "#6a3de8",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    opacity: loading || capturedImages.length === 0 ? 0.7 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? "Completing..." : "Face Register"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Purple Panel - Right for admin */}
        {!isAgent && (
          <div
            style={{
              width: "50%",
              background: "linear-gradient(135deg, #6a3de8, #512da8)",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "12px",
                letterSpacing: "0.5px",
              }}
            >
              Hello, Admin!
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                maxWidth: "320px",
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: "12px",
              }}
            >
              Create your administrator account to manage and oversee the
              platform operations effectively.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
