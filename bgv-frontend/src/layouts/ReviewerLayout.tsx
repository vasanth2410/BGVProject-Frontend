import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "./AdminLayout.css";

export default function ReviewerLayout() {

  return (

    <div className="layout">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="content">

        {/* Header */}

        <Header />

        {/* Page Content */}

        <main
          style={{
            padding: "30px",
            minHeight: "calc(100vh - 70px)",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

}