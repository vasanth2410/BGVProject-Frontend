import "./Header.css";

import {
  Search,
  NotificationsNone,
} from "@mui/icons-material";
import DarkModeToggle from "./DarkModeToggle";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const email =
    localStorage.getItem("email") ??
    "reviewer@test.com";

  const role =
    localStorage.getItem("role") ??
    "Reviewer";

  const userName =
    email.split("@")[0];

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

  return (

    <header className="header">

      <div className="header-left">

        <div className="header-title">

          Welcome,

          <span className="header-name">

            {" "}{userName}

          </span>

        </div>

        <div className="header-subtitle">

          {role}

        </div>

      </div>

      <div className="header-right">

        <DarkModeToggle />

        {role.toLowerCase() === "admin" && (
          <button className="header-icon" style={{ marginLeft: "15px" }} onClick={handleSearchClick}>
            <Search />
          </button>
        )}

        <button className="header-icon" onClick={handleNotificationsClick}>
          <NotificationsNone />
        </button>

        <div className="header-user" onClick={handleProfileClick} style={{ cursor: "pointer" }}>

          <div className="header-avatar">

            {userName.charAt(0).toUpperCase()}

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