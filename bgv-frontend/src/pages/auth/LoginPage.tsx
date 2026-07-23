import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, resetPassword } from "../../services/AuthService";
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
      {/* Background cyber grid & glow effects */}
      <div className="cyber-grid"></div>
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-glow-orb orb-3"></div>

      <div className="login-container">
        {/* Top Left Header Logo */}
        <header className="brand-header">
          <div className="brand-logo-group">
            <div className="brand-shield-icon">
              <svg viewBox="0 0 24 24" fill="none" className="brand-svg">
                <path
                  d="M12 2L3 7V12C3 17.523 7.03 21.74 12 23C16.97 21.74 21 17.523 21 12V7L12 2Z"
                  fill="url(#brandGrad)"
                />
                <path
                  d="M9 12L11 14L15 10"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="brandGrad" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#00f0ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-title-wrap">
              <h1 className="brand-title">
                BGV <span className="title-blue">System</span>
              </h1>
              <p className="brand-subtitle">Background Verification System</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="main-grid">
          {/* Left Column: Hologram Stage */}
          <div className="hologram-area">
            <div className="hologram-canvas">

              {/* Background Translucent Cyber Waves */}
              <div className="cyber-waves-backdrop">
                <svg viewBox="0 0 600 500" fill="none" className="waves-svg">
                  <path
                    d="M-50 400 Q150 250 300 350 T650 200"
                    stroke="rgba(0, 240, 255, 0.18)"
                    strokeWidth="2"
                  />
                  <path
                    d="M-50 450 Q200 300 350 400 T650 250"
                    stroke="rgba(37, 99, 235, 0.22)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M-50 350 Q100 200 250 300 T650 150"
                    stroke="rgba(56, 189, 248, 0.15)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Constellation Orbits & Glowing Particle Dots (Matching Image 3) */}
              <div className="constellation-orbits">
                <svg viewBox="0 0 500 500" fill="none" className="orbits-svg">
                  {/* Orbit Ring 1 */}
                  <ellipse
                    cx="250"
                    cy="230"
                    rx="210"
                    ry="85"
                    stroke="url(#orbitGrad1)"
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                    transform="rotate(-15 250 230)"
                  />
                  {/* Orbit Ring 2 */}
                  <ellipse
                    cx="250"
                    cy="230"
                    rx="225"
                    ry="90"
                    stroke="url(#orbitGrad2)"
                    strokeWidth="1.8"
                    transform="rotate(22 250 230)"
                  />
                  {/* Orbit Ring 3 */}
                  <ellipse
                    cx="250"
                    cy="230"
                    rx="195"
                    ry="78"
                    stroke="url(#orbitGrad1)"
                    strokeWidth="1.5"
                    transform="rotate(-40 250 230)"
                  />

                  {/* Glowing Particle Nodes on Orbits */}
                  <circle cx="70" cy="180" r="4.5" fill="#00f0ff" filter="url(#dotGlow)" />
                  <circle cx="430" cy="280" r="4.5" fill="#00f0ff" filter="url(#dotGlow)" />
                  <circle cx="390" cy="120" r="4" fill="#38bdf8" filter="url(#dotGlow)" />
                  <circle cx="110" cy="320" r="4" fill="#38bdf8" filter="url(#dotGlow)" />
                  <circle cx="475" cy="210" r="3.5" fill="#60a5fa" filter="url(#dotGlow)" />
                  <circle cx="30" cy="250" r="3.5" fill="#60a5fa" filter="url(#dotGlow)" />

                  <defs>
                    <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#2563eb" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="orbitGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
                    </linearGradient>
                    <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* Central Large 3D Shield */}
              <div className="shield-3d-wrapper">
                <div className="shield-glow-effect"></div>
                <div className="shield-hero-graphic">
                  <svg viewBox="0 0 240 280" fill="none" className="large-shield-svg">
                    <defs>
                      <linearGradient id="mainShieldBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1d4ed8" />
                        <stop offset="45%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>
                      <linearGradient id="mainShieldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#1e40af" />
                      </linearGradient>
                      <filter id="neonShieldGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Outer Shield Shell */}
                    <path
                      d="M120 20 L210 60 V150 C210 215 120 255 120 255 C120 255 30 215 30 150 V60 Z"
                      fill="url(#mainShieldBody)"
                      stroke="url(#mainShieldRim)"
                      strokeWidth="7"
                      filter="url(#neonShieldGlow)"
                    />

                    {/* Inner Bezel Layer */}
                    <path
                      d="M120 38 L194 72 V145 C194 200 120 234 120 234 C120 234 46 200 46 145 V72 Z"
                      fill="rgba(10, 22, 50, 0.45)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2.5"
                    />

                    {/* Bright Glowing White Checkmark */}
                    <path
                      d="M86 140 L112 166 L158 114"
                      stroke="#FFFFFF"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="drop-shadow(0 0 14px rgba(255, 255, 255, 1))"
                    />
                  </svg>
                </div>
              </div>

              {/* 3D Hologram Pedestal Base & Vertical Light Beam (Matching Image 3) */}
              <div className="hologram-pedestal">
                {/* Glowing Vertical Light Beam Cylinder */}
                <div className="light-beam-cylinder"></div>

                {/* Concentric Floor Rings */}
                <div className="floor-ring ring-1"></div>
                <div className="floor-ring ring-2"></div>
                <div className="floor-ring ring-3"></div>
                <div className="floor-ring ring-4"></div>
                <div className="floor-ring ring-5"></div>

                {/* Floor Glow Reflection Disc */}
                <div className="floor-glow-disc"></div>
              </div>

              {/* 5 Verification Feature Nodes with Standalone Square Icon Boxes */}

              {/* Node 1: IDENTITY VERIFICATION (Top Center / Right - Flex Row) */}
              <div className="feature-node node-identity">
                <div className="square-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="node-text-col">
                  <span className="text-bold">IDENTITY</span>
                  <span className="text-light">VERIFICATION</span>
                </div>
              </div>

              {/* Node 2: EDUCATION VERIFICATION (Right Side - Flex Column) */}
              <div className="feature-node node-education">
                <div className="square-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div className="node-text-col center">
                  <span className="text-bold">EDUCATION</span>
                  <span className="text-light">VERIFICATION</span>
                </div>
              </div>

              {/* Node 3: CRIMINAL RECORD CHECK (Bottom Right - Flex Column) */}
              <div className="feature-node node-criminal">
                <div className="square-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div className="node-text-col center">
                  <span className="text-bold">CRIMINAL</span>
                  <span className="text-light">RECORD CHECK</span>
                </div>
              </div>

              {/* Node 4: EMPLOYMENT VERIFICATION (Bottom Left - Flex Column) */}
              <div className="feature-node node-employment">
                <div className="square-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className="node-text-col center">
                  <span className="text-bold">EMPLOYMENT</span>
                  <span className="text-light">VERIFICATION</span>
                </div>
              </div>

              {/* Node 5: DOCUMENT CHECK (Left Side - Flex Column) */}
              <div className="feature-node node-document">
                <div className="square-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div className="node-text-col center">
                  <span className="text-bold">DOCUMENT</span>
                  <span className="text-light">CHECK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Sign In Card */}
          <div className="card-area">
            <div className="login-glass-card">
              <div className="card-top-header">
                <h2 className="welcome-heading">
                  Welcome Back! <span className="hand-wave">👋</span>
                </h2>
                <p className="welcome-subtext">Sign in to continue to your account</p>
              </div>

              <form
                className="signin-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                {/* Email Input */}
                <div className="form-field">
                  <label className="form-label" htmlFor="email-input">
                    Email Address
                  </label>
                  <div className="input-box">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="youremail@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="form-field">
                  <div className="field-label-row">
                    <label className="form-label" htmlFor="password-input">
                      Password
                    </label>
                    <span
                      className="forgot-pass-link"
                      onClick={() => {
                        setShowResetModal(true);
                        setResetSuccessMsg("");
                        setResetErrorMsg("");
                      }}
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <div className="input-box">
                    <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="show-pass-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="remember-box">
                  <label className="checkbox-wrap">
                    <input type="checkbox" defaultChecked />
                    <span className="checkbox-box"></span>
                    <span className="checkbox-label-text">Remember me</span>
                  </label>
                </div>

                {/* Error Banner */}
                {error && <div className="error-alert">{error}</div>}

                {/* Sign In Button */}
                <button type="submit" className="submit-btn" disabled={loading}>
                  <span>{loading ? "Signing In..." : "Sign In"}</span>
                  {!loading && (
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom 3 Features Badges */}
        <div className="bottom-badges-row">
          <div className="bottom-badge-card">
            <div className="badge-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div className="badge-info">
              <h4>Secure & Trusted</h4>
              <p>Enterprise grade security to protect your data</p>
            </div>
          </div>

          <div className="bottom-badge-card">
            <div className="badge-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="badge-info">
              <h4>Role Based Access</h4>
              <p>Access only what you need</p>
            </div>
          </div>

          <div className="bottom-badge-card">
            <div className="badge-icon-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="badge-info">
              <h4>Fast & Reliable</h4>
              <p>Quick verification with accurate results</p>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <footer className="footer-bar">
          <svg className="footer-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <span>BGV System © 2026. All rights reserved.</span>
        </footer>
      </div>

      {/* Password Reset Modal */}
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