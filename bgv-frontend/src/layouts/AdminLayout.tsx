import AdminSidebar
from "../components/admin/AdminSidebar";

import Header
from "../components/Header";

import "./AdminLayout.css";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {

  return (

    <div className="layout">

      <AdminSidebar />

      <div className="content">

        <Header />

        {children}

      </div>

    </div>

  );

}