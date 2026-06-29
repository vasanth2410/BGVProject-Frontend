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

export default function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  const email =
    localStorage.getItem("email") ??
    "reviewer@test.com";

  const role =
    localStorage.getItem("role") ??
    "Reviewer";

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
    },

  ];

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");

  };

  return (

    <aside className="sidebar">

      {/* Logo */}

      <div className="logo-section">

        <h2>

          BGV System

        </h2>

        <p>

          Background Verification

        </p>

      </div>

      {/* Menu */}

      <div className="menu-list">

        {

          items.map((item) => (

            <Link

              key={item.path}

              to={item.path}

              className={

                location.pathname === item.path

                  ? "menu-link active"

                  : "menu-link"

              }

            >

              <span className="menu-icon">

                {item.icon}

              </span>

              <span>

                {item.name}

              </span>

            </Link>

          ))

        }

      </div>

      {/* Footer */}

      <div className="sidebar-footer">

        <div className="user-info">

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

          onClick={handleLogout}

        >

          <Logout />

          Logout

        </button>

      </div>

    </aside>

  );

}