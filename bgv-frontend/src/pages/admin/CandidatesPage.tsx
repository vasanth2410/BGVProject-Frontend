import { useEffect, useState } from "react";


import AssignCandidateModal
from "../../components/AssignCandidateModal";

import { useNavigate, useLocation }
  from "react-router-dom";

import AddCandidateModal
  from "../../components/AddCandidateModal";

import AdminLayout
  from "../../layouts/AdminLayout";

import {
  getCandidates,
  deleteCandidate,
}
from "../../services/CandidateManagementService";

import type {
  Candidate,
}
from "../../types/CandidateManagement";

import "./CandidatesPage.css";

export default function CandidatesPage() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [candidates,
    setCandidates]
      = useState<Candidate[]>([]);

  const [loading,
    setLoading]
      = useState(true);

  const [search, setSearch] = useState(location.state?.filter || "");
  const [statusTab, setStatusTab] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const loadCandidates = async () => {
    try {
      const result = await getCandidates();
      setCandidates(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this candidate?");
    if (!confirmed) return;

    try {
      await deleteCandidate(id);
      alert("Candidate Deleted Successfully");
      loadCandidates();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await loadCandidates();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const allCount = candidates.length;
  const pendingCount = candidates.filter((c) => c.status === "Pending").length;
  const approvedCount = candidates.filter((c) => c.status === "Approved").length;
  const rejectedCount = candidates.filter((c) => c.status === "Rejected").length;

  const filteredCandidates = candidates.filter((candidate) => {
    if (statusTab !== "All" && candidate.status.toLowerCase() !== statusTab.toLowerCase()) {
      return false;
    }

    const keyword = search.toLowerCase();
    if (!keyword) return true;

    return (
      candidate.fullName.toLowerCase().includes(keyword) ||
      candidate.email.toLowerCase().includes(keyword) ||
      candidate.phoneNumber.toLowerCase().includes(keyword) ||
      candidate.status.toLowerCase().includes(keyword) ||
      candidate.id.toString().includes(keyword)
    );
  });

  return (
    <AdminLayout>
      <div style={{ padding: "30px" }}>
        <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "25px" }}>
          {/* Left: Title */}
          <h1 className="page-title" style={{ margin: 0 }}>
            <span className="candidate-emoji-icon">🧑‍💼</span> Candidates
          </h1>

          {/* Center: Quick Status Filter Tabs */}
          <div className="status-tabs-container">
            <button
              className={`status-tab ${statusTab === "All" ? "active" : ""}`}
              onClick={() => setStatusTab("All")}
            >
              All <span className="tab-count">{allCount}</span>
            </button>
            <button
              className={`status-tab ${statusTab === "Pending" ? "active" : ""}`}
              onClick={() => setStatusTab("Pending")}
            >
              <span className="dot pending-dot" />
              Pending <span className="tab-count">{pendingCount}</span>
            </button>
            <button
              className={`status-tab ${statusTab === "Approved" ? "active" : ""}`}
              onClick={() => setStatusTab("Approved")}
            >
              <span className="dot approved-dot" />
              Approved <span className="tab-count">{approvedCount}</span>
            </button>
            <button
              className={`status-tab ${statusTab === "Rejected" ? "active" : ""}`}
              onClick={() => setStatusTab("Rejected")}
            >
              <span className="dot rejected-dot" />
              Rejected <span className="tab-count">{rejectedCount}</span>
            </button>
          </div>

          {/* Right: Search & Add Button */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search by Name or Email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="add-button"
              onClick={() => setShowModal(true)}
            >
              + Add Candidate
            </button>
          </div>
        </div>

    {loading ? (

  <h3>Loading...</h3>

) : (

  <div className="table-container">
    <table className="candidate-table">

      <thead>

      <tr>

        <th>ID</th>

        <th>Name</th>

        <th>Email</th>

        <th>Phone</th>

        <th>Status</th>

        <th>Actions</th>

      </tr>

    </thead>

    <tbody>

      {filteredCandidates.length === 0 ? (

        <tr>

          <td
            colSpan={6}
            style={{
              textAlign: "center",
              padding: "30px",
            }}
          >
            No candidates found.
          </td>

        </tr>

      ) : (

        filteredCandidates.map((candidate, index) => (

          <tr
            key={candidate.id}
            onClick={() =>
              navigate(`/admin/candidates/${candidate.id}`)
            }
            style={{
              cursor: "pointer",
            }}
          >

            <td>{index + 1}</td>

            <td>{candidate.fullName}</td>

            <td>{candidate.email}</td>

            <td>{candidate.phoneNumber}</td>

            <td>

              <span
                className={
                  candidate.status === "Pending"
                    ? "status-pending"
                    : candidate.status === "Approved"
                    ? "status-approved"
                    : "status-rejected"
                }
              >
                {candidate.status}
              </span>

            </td>

            <td>

              <div className="action-buttons">
                <button
                  className="btn-view"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/candidates/${candidate.id}`);
                  }}
                >
                  View
                </button>

                <button
                  className="btn-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/candidates/edit/${candidate.id}`);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(candidate.id);
                  }}
                >
                  Delete
                </button>

                <button
                  className="btn-assign"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAssignModal(true);
                  }}
                >
                  Assign
                </button>
              </div>

            </td>

          </tr>

        ))

      )}

    </tbody>

    </table>
  </div>
)}

        {showModal && (

          <AddCandidateModal
            onClose={() =>
              setShowModal(false)
            }
            onSuccess={
              loadCandidates
            }
          />

        )}

        {showAssignModal && (

  <AssignCandidateModal
    onClose={() =>
      setShowAssignModal(false)
    }
    onSuccess={() => {

      alert(
        "Assignment Created"
      );

    }}
  />

)}

      </div>

    </AdminLayout>

  );

}