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

export default function AdminSidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const handleLogout =
    () => {

      localStorage.clear();

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

    <div className="sidebar">

      <div className="logo-section">

        <h2>
          BGV System
        </h2>

        <p>
          Background Verification
        </p>

      </div>

      <div className="menu-list">

        {menuItems.map(
          (item) => (

            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname === item.path
                  ? "menu-link active"
                  : "menu-link"
              }
            >

              {item.icon}

              <span>
                {item.name}
              </span>

            </Link>

          )
        )}

      </div>

      <div className="sidebar-footer">

        <div className="user-info" onClick={() => navigate('/admin/profile')} style={{ cursor: "pointer" }}>

          <div className="avatar">

            A

          </div>

          <div>

            <div className="user-name">

              Admin User

            </div>

            <div className="user-email">

              srini@test.com

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

    </div>

  );

}