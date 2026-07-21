import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, resetPassword } from "../../services/AuthService";
import logoImg from "../../assets/logo.png";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset password states
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPasswordVal, setNewPasswordVal] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessMsg, setResetSuccessMsg] = useState("");
  const [resetErrorMsg, setResetErrorMsg] = useState("");

  const handleResetPassword = async () => {
    if (!resetEmail || !newPasswordVal) {
      setResetErrorMsg("Please enter email and new password.");
      setResetSuccessMsg("");
      return;
    }

    try {
      setResetLoading(true);
      setResetErrorMsg("");
      setResetSuccessMsg("");
      await resetPassword(resetEmail, newPasswordVal);
      setResetSuccessMsg("Password reset successfully. You can now login!");
      setResetEmail("");
      setNewPasswordVal("");
    } catch (err: any) {
      console.error(err);
      setResetErrorMsg("Failed to reset password. Please check your email.");
    } finally {
      setResetLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await login({
        email,
        password,
      });

      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.email);
      localStorage.setItem("role", result.role);

      if (result.role === "Admin") {
        navigate("/admin");
      } else if (result.role === "Reviewer") {
        navigate("/reviewer");
      } else {
        navigate("/candidate");
      }
    } catch (error) {
      console.error(error);
      setError("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background glowing waves / grids decoration */}
      <div className="bg-decoration-right"></div>
      <div className="bg-decoration-left"></div>

      {/* Brand Header */}
      <header className="brand-header">
        <div className="brand-logo">
          <img src={logoImg} alt="BGV System Logo" className="brand-logo-img" />
          <div className="brand-text">
            <span className="brand-title">BGV System</span>
            <span className="brand-subtitle">Background Verification System</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Left Side: Glowing Hologram Shield */}
        <div className="hologram-column">
          <div className="hologram-wrapper">
            {/* Padlock and glowing Shield */}
            <div className="hologram-shield-container">
              <svg className="hologram-shield-svg" viewBox="0 0 200 200" fill="none">
                <defs>
                  <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="85" fill="url(#shieldGlow)" />
                {/* Shield Path */}
                <path
                  d="M100 35 L160 55 V110 C160 150 100 175 100 175 C100 175 40 150 40 110 V55 Z"
                  stroke="url(#shieldBorder)"
                  strokeWidth="6"
                  fill="rgba(15, 23, 42, 0.6)"
                  filter="drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))"
                />
                {/* Padlock Path */}
                <rect x="82" y="102" width="36" height="28" rx="4" fill="#3b82f6" />
                <path
                  d="M90 102 V90 A10 10 0 0 1 110 90 V102"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  fill="none"
                />
                <circle cx="100" cy="116" r="3" fill="#ffffff" />
                <path d="M100 119 V124" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>
            {/* Orbital Rings */}
            <div className="orbital-ring ring-1"></div>
            <div className="orbital-ring ring-2"></div>
            {/* Hologram base platform */}
            <div className="hologram-platform"></div>
            <div className="hologram-beams"></div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="login-card-column">
          <div className="login-card">
            <h3 className="card-title">Sign In</h3>

            {/* Email field */}
            <div className="form-group">
              <label className="field-label" htmlFor="email-input">
                Email Address
              </label>
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  id="email-input"
                  type="email"
                  placeholder="youremail@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="form-group">
              <div className="password-label-row">
                <label className="field-label" htmlFor="password-input">
                  Password
                </label>
                <span
                  className="forgot-password-link"
                  onClick={() => {
                    setShowResetModal(true);
                    setResetSuccessMsg("");
                    setResetErrorMsg("");
                  }}
                >
                  Forgot Password?
                </span>
              </div>
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="remember-me-container">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span className="checkbox-custom"></span>
                Remember me
              </label>
            </div>

            {/* Error Message */}
            {error && <div className="login-error-msg">{error}</div>}

            {/* Submit Button */}
            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                "Signing In..."
              ) : (
                <>
                  <span>Sign In</span>
                  <svg
                    className="btn-arrow-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Row Value-Props badges */}
      <section className="features-row">
        {/* Badge 1 */}
        <div className="feature-badge">
          <div className="badge-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 11 11 13 15 9" />
            </svg>
          </div>
          <div className="badge-details">
            <h4>Secure & Trusted</h4>
            <p>Enterprise grade security for your data</p>
          </div>
        </div>

        {/* Badge 2 */}
        <div className="feature-badge">
          <div className="badge-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="badge-details">
            <h4>Role Based Access</h4>
            <p>Access only what you need</p>
          </div>
        </div>

        {/* Badge 3 */}
        <div className="feature-badge">
          <div className="badge-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="badge-details">
            <h4>Smart Verification</h4>
            <p>Faster. Accurate. Reliable.</p>
          </div>
        </div>
      </section>

      {/* Muted Copyright Footer */}
      <footer className="login-footer">
        <svg
          className="footer-shield-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 11 11 13 15 9" />
        </svg>
        <span>BGV System © 2026. All rights reserved.</span>
      </footer>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="reset-modal-overlay">
          <div className="reset-modal-box">
            <h3>Reset Password</h3>
            <p>Enter your registered email and a new password to reset.</p>

            <input
              type="email"
              placeholder="Email Address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              disabled={resetLoading}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPasswordVal}
              onChange={(e) => setNewPasswordVal(e.target.value)}
              disabled={resetLoading}
            />

            {resetSuccessMsg && <div className="reset-success">{resetSuccessMsg}</div>}

            {resetErrorMsg && <div className="reset-error">{resetErrorMsg}</div>}

            <div className="reset-modal-actions">
              <button
                type="button"
                className="btn-reset-cancel"
                onClick={() => {
                  setShowResetModal(false);
                  setResetSuccessMsg("");
                  setResetErrorMsg("");
                }}
                disabled={resetLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-reset-submit"
                onClick={handleResetPassword}
                disabled={resetLoading}
              >
                {resetLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}