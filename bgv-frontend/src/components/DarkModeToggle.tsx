import { useState, useEffect } from "react";
import "./DarkModeToggle.css";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div 
      className={`theme-toggle ${isDark ? "on" : "off"}`} 
      onClick={() => setIsDark(!isDark)}
    >
      <div className="toggle-track">
        <span className="toggle-text">{isDark ? "ON" : "OFF"}</span>
        <div className="toggle-thumb">
          {isDark ? (
            <svg viewBox="0 0 24 24" className="moon-icon" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              <path d="M18 4l1 1 1-1-1-1zM22 8l1 1 1-1-1-1z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="sun-icon" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
