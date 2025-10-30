import "./style.css";

export default function Login() {
  return (
     <body>
    <main class="login-container">
      {/* <!-- Left Side - Login Form --> */}
      <section class="login-form-section">
        <div class="form-wrapper">
          <div class="brand-logo">
            <h1>Sembe</h1>
            <p>Welcome back! Please sign in to your account.</p>
          </div>

          <form class="login-form" action="" method="post">
            <div class="input-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div class="input-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div class="form-options">
              <div class="remember-me">
                <input type="checkbox" id="remember" name="remember" />
                <label for="remember">Remember me</label>
              </div>
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" class="login-btn">Sign In</button>

            <div class="signup-link">
              <p>
                Don't have an account? <a href="pages/index.html">Sign up here</a>
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* <!-- Right Side - Hero Image --> */}
      <section class="hero-image-section">
        <div class="hero-content">
          <div class="hero-overlay">
            <h2>Celebrate Every Moment</h2>
            <p>
              Create unforgettable memories with Sembe - your personal event
              celebration platform.
            </p>
          </div>
        </div>
      </section>
    </main>
  </body>
 
    
    
  )
}