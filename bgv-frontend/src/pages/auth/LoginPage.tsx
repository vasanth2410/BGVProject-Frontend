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

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      setError("");

      const result = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        result.token
      );

      localStorage.setItem(
        "email",
        result.email
      );

      localStorage.setItem(
        "role",
        result.role
      );

      if (result.role === "Admin") {
        navigate("/admin");
      }
      else if (
        result.role === "Reviewer"
      ) {
        navigate("/reviewer");
      }
      else {
        navigate("/candidate");
      }
    }
    catch (error) {
      console.error(error);

      setError(
        "Invalid Email or Password"
      );
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="left-panel">

          <h1>BGV System</h1>

          <h2>
            Background Verification
            Platform
          </h2>

          <p>
            Secure Candidate
            Verification &
            Onboarding Solution
          </p>

          <ul>
            <li>
              Candidate Onboarding
            </li>

            <li>
              Document Verification
            </li>

            <li>
              Reviewer Workflow
            </li>

            <li>
              Audit Tracking
            </li>

            <li>
              Notification Engine
            </li>
          </ul>

        </div>

        <div className="right-panel">

          <h2>Sign In</h2>

          <p>
            Welcome back
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="password-input"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="forgot-password-container">
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

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="login-btn"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </div>

      </div>

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

            {resetSuccessMsg && (
              <div className="reset-success">
                {resetSuccessMsg}
              </div>
            )}

            {resetErrorMsg && (
              <div className="reset-error">
                {resetErrorMsg}
              </div>
            )}

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