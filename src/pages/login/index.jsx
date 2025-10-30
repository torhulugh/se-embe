import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const { login, isLoading, error, clearError, isAuthenticated } = useAuth();

  // Clear errors when component mounts or form data changes
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && onLoginSuccess) {
      onLoginSuccess();
    }
  }, [isAuthenticated, onLoginSuccess]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Save remember me preference
      if (formData.remember) {
        localStorage.setItem("rememberMe", "true");
      }

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

  return (
    <main className="login-container">
      {/* Left Side - Login Form */}
      <section className="login-form-section">
        <div className="form-wrapper">
          <div className="brand-logo">
            <h1>Sembe</h1>
            <p>Welcome back! Please sign in to your account.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Global error message */}
            {error && (
              <div
                className="error-message"
                style={{
                  color: "#d32f2f",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffebee",
                  border: "1px solid #ffcdd2",
                  borderRadius: "4px",
                }}
              >
                {error}
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                required
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "error" : ""}
                required
              />
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="signup-link">
              <p>
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.navigateToSignUp) window.navigateToSignUp();
                  }}
                >
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Right Side - Hero Image */}
      <section className="hero-image-section">
        <div className="hero-content">
          <div className="hero-overlay">
            <h2>Celebrate Every Moment</h2>
            <p>
              Create unforgettable memories with Sembe - your personal event
              celebration platform.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
