import { useEffect, useState } from "react";
import "./Header.css";

import {
  Search,
  NotificationsNone,
  Menu as MenuIcon,
} from "@mui/icons-material";
import DarkModeToggle from "./DarkModeToggle";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "reviewer@test.com");
  const [role, setRole] = useState(localStorage.getItem("role") || "Reviewer");

  useEffect(() => {
    const handleStorageChange = () => {
      setName(localStorage.getItem("name") || "");
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

  const displayName = name ? name.split(" ")[0] : email.split("@")[0];
  const avatarLetter = (name || email || "U").charAt(0).toUpperCase();

  const getBasePath = () => {
    if (role.toLowerCase() === "admin") return "/admin";
    if (role.toLowerCase() === "reviewer") return "/reviewer";
    return "/candidate";
  };

  const handleSearchClick = () => {
    // Navigate to candidates/directory page for searching
    if (role.toLowerCase() === "admin") {
      navigate("/admin/candidates");
    }
  };

  const handleNotificationsClick = () => {
    navigate(`${getBasePath()}/notifications`);
  };

  const handleProfileClick = () => {
    navigate(`${getBasePath()}/profile`);
  };

  const handleToggleSidebar = () => {
    window.dispatchEvent(new Event("toggle-sidebar"));
  };

  return (

    <header className="header">

      <button
        className="header-menu-btn"
        onClick={handleToggleSidebar}
        aria-label="Toggle menu"
      >
        <MenuIcon style={{ fontSize: 24 }} />
      </button>

      <div className="header-left">

        <div className="header-title">

          Welcome,

          <span className="header-name">

            {" "}{displayName}

          </span>

        </div>

        <div className="header-subtitle">

          {role}

        </div>

      </div>

      <div className="header-right">

        <DarkModeToggle />

        {role.toLowerCase() === "admin" && (
          <button className="header-icon" onClick={handleSearchClick}>
            <Search />
          </button>
        )}

        <button className="header-icon" onClick={handleNotificationsClick}>
          <NotificationsNone />
        </button>

        <div className="header-user" onClick={handleProfileClick} style={{ cursor: "pointer" }}>

          <div className="header-avatar">

            {avatarLetter}

          </div>

          <div>

            <div className="header-email">

              {email}

            </div>

            <div className="header-role">

              {role}

            </div>

          </div>

        </div>

      </div>

    </header>

  );

}