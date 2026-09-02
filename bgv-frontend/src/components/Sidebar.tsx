import { useEffect, useState } from "react";
import {
  Dashboard,
  Assignment,
  FactCheck,
  Description,
  Notifications,
  Logout,
} from "@mui/icons-material";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Sidebar.css";
import { clearAuthSession } from "../utils/avatarUtils";
import LogoutConfirmModal from "./LogoutConfirmModal";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("email") || "reviewer@test.com");
  const [role, setRole] = useState(localStorage.getItem("role") || "Reviewer");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setEmail(localStorage.getItem("email") || "reviewer@test.com");
      setRole(localStorage.getItem("role") || "Reviewer");
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("profileUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const items = [
    {
      name: "Dashboard",
      path: "/reviewer",
      icon: <Dashboard />,
    },
    {
      name: "My Assignments",
      path: "/reviewer/assignments",
      icon: <Assignment />,
      badge: 4,
    },
    {
      name: "Verifications",
      path: "/reviewer/verifications",
      icon: <FactCheck />,
    },
    {
      name: "Documents",
      path: "/reviewer/documents",
      icon: <Description />,
    },
    {
      name: "Notifications",
      path: "/reviewer/notifications",
      icon: <Notifications />,
      badge: 2,
    },
  ];

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    clearAuthSession();
    navigate("/");
  };

  const getProfilePath = () => {
    if (role.toLowerCase() === "admin") return "/admin/profile";
    if (role.toLowerCase() === "reviewer") return "/reviewer/profile";
    return "/candidate/profile";
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        {/* Logo */}
        <div className="logo-section">
          <h2>BGV System</h2>
          <p>Background Verification</p>
        </div>

        {/* Menu */}
        <div className="menu-list">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path
                  ? "menu-link active"
                  : "menu-link"
              }
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}

        <div className="sidebar-footer">
          <div
            className="user-info"
            onClick={() => navigate(getProfilePath())}
            style={{ cursor: "pointer" }}
          >
            <div className="avatar">
              {email.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="user-name">
                {role}
              </div>
              <div className="user-email">
                {email}
              </div>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogoutClick}
          >
            <Logout />
            Logout
          </button>
        </div>

        <LogoutConfirmModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
        />
      </aside>
    </>
  );
}