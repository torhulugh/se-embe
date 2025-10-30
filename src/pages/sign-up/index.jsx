import "./style.css";

export default function SignUp() {
  return (
    <main className="signup-container">
      {/* Left Side - Signup Form */}
      <section className="signup-form-section">
        <div className="form-wrapper">
          <div className="brand-logo">
            <h1>Sembe</h1>
            <p>Join us today! Create your account to start celebrating.</p>
          </div>

          <form className="signup-form" action="" method="post">
            <div className="input-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" required />
            </div>

            <div className="input-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>

            <div className="form-options">
              <div className="terms-agreement">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">
                  I agree to the{" "}
                  <a href="#" className="terms-link">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Create Account
            </button>

            <div className="login-link">
              <p>
                Already have an account? <a href="login.html">Sign in here</a>
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
