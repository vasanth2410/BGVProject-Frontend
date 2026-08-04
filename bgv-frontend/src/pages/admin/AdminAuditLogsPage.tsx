import { useEffect, useState, useMemo } from "react";
import "./CandidatesPage.css";
import "./AdminAuditLogsPage.css";

import {
  FaShieldAlt,
  FaUserAlt,
  FaUserCheck,
  FaListAlt,
  FaSyncAlt,
  FaDownload,
  FaSearch,
  FaKey,
} from "react-icons/fa";

import {
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { getAuditLogs } from "../../services/AuditService";
import type { Audit } from "../../types/Audit";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<Audit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Search & Filtering
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("ALL");

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const result = await getAuditLogs();
      setLogs(result || []);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(
        error.response?.data || error.message || "Failed to load audit logs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchLogs();
  }, []);

  // Summary Stat Calculations
  const stats = useMemo(() => {
    const total = logs.length;
    const adminCount = logs.filter(
      (l) => l.role && l.role.toLowerCase() === "admin"
    ).length;
    const candidateCount = logs.filter(
      (l) => l.role && l.role.toLowerCase() === "candidate"
    ).length;
    const reviewerCount = logs.filter(
      (l) => l.role && l.role.toLowerCase() === "reviewer"
    ).length;

    return { total, adminCount, candidateCount, reviewerCount };
  }, [logs]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesRole =
        selectedRole === "ALL" ||
        (log.role && log.role.toUpperCase() === selectedRole);

      const query = searchTerm.toLowerCase();
      const matchesSearch =
        !query ||
        log.id.toString().includes(query) ||
        (log.action && log.action.toLowerCase().includes(query)) ||
        (log.performedBy && log.performedBy.toLowerCase().includes(query)) ||
        (log.role && log.role.toLowerCase().includes(query));

      return matchesRole && matchesSearch;
    });
  }, [logs, selectedRole, searchTerm]);

  // Paginated Logs
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const displayedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole]);

  // Export to CSV Function
  const handleExportCSV = () => {
    if (logs.length === 0) return;
    const headers = ["ID", "Action", "User Email", "Role", "Date"];
    const rows = filteredLogs.map((log) => [
      log.id,
      `"${log.action || ""}"`,
      `"${log.performedBy || ""}"`,
      `"${log.role || ""}"`,
      `"${new Date(log.performedAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper for Role Badges
  const renderRoleBadge = (role: string) => {
    const r = (role || "").toLowerCase();
    if (r === "admin") {
      return (
        <span className="role-badge admin">
          <FaShieldAlt style={{ fontSize: "11px" }} /> Admin
        </span>
      );
    }
    if (r === "candidate") {
      return (
        <span className="role-badge candidate">
          <FaUserAlt style={{ fontSize: "11px" }} /> Candidate
        </span>
      );
    }
    if (r === "reviewer") {
      return (
        <span className="role-badge reviewer">
          <FaUserCheck style={{ fontSize: "11px" }} /> Reviewer
        </span>
      );
    }
    return <span className="role-badge">{role}</span>;
  };

  return (
    <div className="audit-page-container">
      {/* Header with Title & Action Buttons */}
      <div className="audit-header">
        <h1 className="audit-title">
          <span className="auditlog-emoji-icon">🛡️</span> Audit Logs
        </h1>

        <div className="audit-header-actions">
          <button
            className="audit-action-btn"
            onClick={() => void fetchLogs()}
            title="Refresh Audit Logs"
          >
            <FaSyncAlt className={loading ? "spin-icon" : ""} /> Refresh
          </button>
          <button
            className="audit-action-btn primary"
            onClick={handleExportCSV}
            disabled={logs.length === 0}
            title="Export CSV Report"
          >
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* 📊 4 TOP SUMMARY STAT CARDS */}
      <div className="audit-stats-grid">
        {/* Card 1: Total Logs */}
        <div
          className="audit-stat-card"
          onClick={() => setSelectedRole("ALL")}
          title="View All Audit Logs"
        >
          <div className="stat-card-info">
            <h4>Total Audit Logs</h4>
            <h2>{stats.total}</h2>
            <span className="stat-card-trend" style={{ color: "#2563eb" }}>
              <FiTrendingUp /> Live system events
            </span>
          </div>
          <div className="stat-icon-wrapper stat-icon-total">
            <FaListAlt />
          </div>
        </div>

        {/* Card 2: Admin Activities */}
        <div
          className="audit-stat-card"
          onClick={() => setSelectedRole("ADMIN")}
          title="Filter Admin Activities"
        >
          <div className="stat-card-info">
            <h4>Admin Activities</h4>
            <h2>{stats.adminCount}</h2>
            <span className="stat-card-trend" style={{ color: "#9333ea" }}>
              🛡️ System & User Mgmt
            </span>
          </div>
          <div className="stat-icon-wrapper stat-icon-admin">
            <FaShieldAlt />
          </div>
        </div>

        {/* Card 3: Candidate Logins */}
        <div
          className="audit-stat-card"
          onClick={() => setSelectedRole("CANDIDATE")}
          title="Filter Candidate Logins"
        >
          <div className="stat-card-info">
            <h4>Candidate Logins</h4>
            <h2>{stats.candidateCount}</h2>
            <span className="stat-card-trend" style={{ color: "#10b981" }}>
              👤 Portal User Logins
            </span>
          </div>
          <div className="stat-icon-wrapper stat-icon-candidate">
            <FaUserAlt />
          </div>
        </div>

        {/* Card 4: Reviewer Actions */}
        <div
          className="audit-stat-card"
          onClick={() => setSelectedRole("REVIEWER")}
          title="Filter Reviewer Actions"
        >
          <div className="stat-card-info">
            <h4>Reviewer Actions</h4>
            <h2>{stats.reviewerCount}</h2>
            <span className="stat-card-trend" style={{ color: "#f59e0b" }}>
              🧑‍⚖️ Verifications & Checks
            </span>
          </div>
          <div className="stat-icon-wrapper stat-icon-reviewer">
            <FaUserCheck />
          </div>
        </div>
      </div>

      {/* Toolbar: Search + Role Filter Tabs */}
      <div className="audit-toolbar">
        {/* Search Input */}
        <div className="audit-search-box">
          <FaSearch className="search-icon-inside" />
          <input
            type="text"
            className="audit-search-input"
            placeholder="Search by action, email, role, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Role Tabs */}
        <div className="role-tabs">
          <button
            className={`role-tab-btn ${selectedRole === "ALL" ? "active" : ""}`}
            onClick={() => setSelectedRole("ALL")}
          >
            All Logs <span className="tab-badge">{stats.total}</span>
          </button>
          <button
            className={`role-tab-btn ${selectedRole === "ADMIN" ? "active" : ""}`}
            onClick={() => setSelectedRole("ADMIN")}
          >
            Admin <span className="tab-badge">{stats.adminCount}</span>
          </button>
          <button
            className={`role-tab-btn ${selectedRole === "CANDIDATE" ? "active" : ""}`}
            onClick={() => setSelectedRole("CANDIDATE")}
          >
            Candidate <span className="tab-badge">{stats.candidateCount}</span>
          </button>
          <button
            className={`role-tab-btn ${selectedRole === "REVIEWER" ? "active" : ""}`}
            onClick={() => setSelectedRole("REVIEWER")}
          >
            Reviewer <span className="tab-badge">{stats.reviewerCount}</span>
          </button>
        </div>
      </div>

      {/* Audit Logs Table Container */}
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Action</th>
              <th>User</th>
              <th>Role</th>
              <th>Date & Time</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                  }}
                >
                  <FaSyncAlt
                    className="spin-icon"
                    style={{
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  />
                  Loading audit logs...
                </td>
              </tr>
            ) : errorMsg ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "30px",
                    color: "#ef4444",
                    fontWeight: "600",
                  }}
                >
                  Error: {errorMsg}
                </td>
              </tr>
            ) : displayedLogs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#64748b",
                  }}
                >
                  No audit logs found matching your criteria.
                </td>
              </tr>
            ) : (
              displayedLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <span className="log-id-code">#{log.id}</span>
                  </td>
                  <td>
                    <span className="action-pill">
                      <FaKey style={{ fontSize: "12px", color: "#3b82f6" }} />
                      {log.action}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{log.performedBy}</td>
                  <td>{renderRoleBadge(log.role)}</td>
                  <td style={{ color: "#64748b", fontSize: "13px" }}>
                    {new Date(log.performedAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "medium",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {!loading && filteredLogs.length > 0 && (
          <div className="audit-pagination">
            <span className="pagination-info">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, filteredLogs.length)} of{" "}
              {filteredLogs.length} logs
            </span>

            <div className="pagination-controls">
              <button
                className="page-nav-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft style={{ verticalAlign: "middle" }} /> Previous
              </button>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  padding: "0 8px",
                  color: "#64748b",
                }}
              >
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="page-nav-btn"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next <FiChevronRight style={{ verticalAlign: "middle" }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}