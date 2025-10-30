import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

export default function SignUp({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();

  // Clear errors when component mounts or form data changes
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [formData, clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && onSignUpSuccess) {
      onSignUpSuccess();
    }
  }, [isAuthenticated, onSignUpSuccess]);

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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (result.success) {
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
    }
  };

  return (
    <main className="signup-container">
      {/* Left Side - Signup Form */}
      <section className="signup-form-section">
        <div className="form-wrapper">
          <div className="brand-logo">
            <h1>Sembe</h1>
            <p>Join us today! Create your account to start celebrating.</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
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
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "error" : ""}
                required
              />
              {errors.firstName && (
                <span className="field-error">{errors.firstName}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "error" : ""}
                required
              />
              {errors.lastName && (
                <span className="field-error">{errors.lastName}</span>
              )}
            </div>

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

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "error" : ""}
                required
              />
              {errors.confirmPassword && (
                <span className="field-error">{errors.confirmPassword}</span>
              )}
            </div>

            <div className="form-options">
              <div className="terms-agreement">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className={errors.terms ? "error" : ""}
                  required
                />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a href="#" className="terms-link">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              {errors.terms && (
                <span className="field-error">{errors.terms}</span>
              )}
            </div>

            <button type="submit" className="signup-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="login-link">
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.navigateToLogin) window.navigateToLogin();
                  }}
                >
                  Sign in here
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
            <h2>Start Your Journey</h2>
            <p>
              Join thousands of users who are already creating amazing
              celebrations and memorable moments with Sembe.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
