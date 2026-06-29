import "./Header.css";

import {
  Search,
  NotificationsNone,
} from "@mui/icons-material";

export default function Header() {

  const email =
    localStorage.getItem("email") ??
    "reviewer@test.com";

  const role =
    localStorage.getItem("role") ??
    "Reviewer";

  const userName =
    email.split("@")[0];

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

        <button className="header-icon">

          <Search />

        </button>

        <button className="header-icon">

          <NotificationsNone />

        </button>

        <div className="header-user">

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