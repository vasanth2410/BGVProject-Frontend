import { useState, useEffect } from "react";
import {
  Dashboard,
  People,
  Assignment,
  Notifications,
  Report,
  History,
  Logout,
} from "@mui/icons-material";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "../Sidebar.css";
import { clearAuthSession } from "../../utils/avatarUtils";
import LogoutConfirmModal from "../LogoutConfirmModal";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("name") || "Admin User");
  const [email, setEmail] = useState(localStorage.getItem("email") || "admin@test.com");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      setName(localStorage.getItem("name") || "Admin User");
      setEmail(localStorage.getItem("email") || "admin@test.com");
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener("profileUpdated", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("profileUpdated", syncUser);
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

  const avatarInitial = (name || email || "A").charAt(0).toUpperCase();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    clearAuthSession();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <Dashboard />,
    },
    {
      name: "Candidates",
      path: "/admin/candidates",
      icon: <People />,
    },
    {
      name: "Assignments",
      path: "/admin/assignments",
      icon: <Assignment />,
    },
    {
      name: "Verifications",
      path: "/admin/verifications",
      icon: <Assignment />,
    },
    {
      name: "Documents",
      path: "/admin/documents",
      icon: <Assignment />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <Report />,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: <Notifications />,
      badge: 3,
    },
    {
      name: "Dead Letters",
      path: "/admin/deadletters",
      icon: <Report />,
    },
    {
      name: "Audit Logs",
      path: "/admin/auditlogs",
      icon: <History />,
    },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="logo-section">
          <h2>BGV System</h2>
          <p>Background Verification</p>
        </div>

        <div className="menu-list">
          {menuItems.map((item: any) => (
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

        <div className="sidebar-footer">
          <div className="user-info" onClick={() => navigate('/admin/profile')} style={{ cursor: "pointer" }}>
            <div className="avatar">
              {avatarInitial}
            </div>
            <div>
              <div className="user-name">
                {name}
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
      </div>
    </>
  );
}