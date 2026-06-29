import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

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

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </div>

      </div>

    </div>
  );
}