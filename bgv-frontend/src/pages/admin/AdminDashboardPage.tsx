import { useEffect, useState } from "react";

import {
  People,
  HourglassTop,
  CheckCircle,
  Cancel,
  PersonAdd,
  Assignment,
  Assessment,
} from "@mui/icons-material";

import {
  Chip,
} from "@mui/material";

import StatusBreakdownChart
from "../../components/charts/StatusBreakdownChart";

import WeeklyTrendChart
from "../../components/charts/WeeklyTrendChart";

import AddCandidateModal
from "../../components/AddCandidateModal";

import "./AdminDashboardPage.css";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getDashboardSummary,
}
from "../../services/DashboardService";

import {
  getRecentCandidates,
}
from "../../services/AdminDashboardService";

import type {
  DashboardSummary,
}
from "../../types/Dashboard";

import type {
  RecentCandidate,
}
from "../../types/AdminDashboard";

import {
  useNavigate,
}
from "react-router-dom";

export default function AdminDashboardPage() {

  const navigate =
    useNavigate();

    const today =
  new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    recentCandidates,
    setRecentCandidates,
  ] =
    useState<RecentCandidate[]>([]);

  const [
    showModal,
    setShowModal,
  ] =
    useState(false);

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        const dashboardResult =
          await getDashboardSummary();

        setSummary(
          dashboardResult
        );

        const recentResult =
          await getRecentCandidates();

        setRecentCandidates(
          recentResult
        );

      }
      catch (error) {

        console.error(error);

      }
      finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchDashboard();

  }, []);

  return (

    <AdminLayout>

      <div className="dashboard-container">

        <div className="dashboard-header">

  <div>

    <h1 className="dashboard-title">
      Dashboard
    </h1>

    <p className="dashboard-subtitle">
      Welcome back, Admin
    </p>

    <small
      style={{
        color: "#777",
      }}
    >
      {today}
    </small>

  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
    }}
  >

    <button
      className="add-btn"
      onClick={() =>
        setShowModal(true)
      }
    >
      <PersonAdd
        fontSize="small"
      />

      Add Candidate

    </button>

    <button
      className="add-btn"
      onClick={() =>
        navigate(
          "/admin/assignments"
        )
      }
    >
      <Assignment
        fontSize="small"
      />

      Assignments

    </button>

    <button
      className="add-btn"
      onClick={() =>
        navigate(
          "/admin/reports"
        )
      }
    >
      <Assessment
        fontSize="small"
      />

      Reports

    </button>

  </div>

</div>

        {loading &&
          <h3>Loading...</h3>
        }

        {!loading && summary && (

          <>

            <div className="dashboard-cards">

              <div className="dashboard-card">

               <People
  color="primary"
  sx={{
    fontSize: 40,
  }}
/>

<h4>Total Candidates</h4>

<h1 className="blue">
  {summary.totalCandidates}
</h1>

              </div>

              <div className="dashboard-card">

                <HourglassTop
  color="warning"
  sx={{
    fontSize: 40,
  }}
/>

<h4>Pending</h4>

                <h1 className="orange">
                  {summary.pendingCandidates}
                </h1>

              </div>

              <div className="dashboard-card">

               <CheckCircle
  color="success"
  sx={{
    fontSize: 40,
  }}
/>

<h4>Approved</h4>

                <h1 className="green">
                  {summary.completedCandidates}
                </h1>

              </div>

              <div className="dashboard-card">

               <Cancel
  color="error"
  sx={{
    fontSize: 40,
  }}
/>

<h4>Rejected</h4>

                <h1 className="red">
                  {summary.rejectedCandidates}
                </h1>

              </div>

            </div>

            <div className="charts-section">

              <div className="chart-card">

                <div className="chart-title">
                  Weekly Trend
                </div>

                <WeeklyTrendChart />

              </div>

              <div className="chart-card">

                <div className="chart-title">
                  Status Breakdown
                </div>

                <StatusBreakdownChart
                  pending={
                    summary.pendingCandidates
                  }
                  approved={
                    summary.completedCandidates
                  }
                  rejected={
                    summary.rejectedCandidates
                  }
                />

              </div>

            </div>

            <div className="pending-section">

              <h2>
                Recent Candidate Activity
              </h2>

              <table className="pending-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Status</th>

                    <th>Created</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {recentCandidates.map(
                    (candidate) => (

                      <tr
                        key={
                          candidate.candidateId
                        }
                      >

                        <td>
                          {candidate.candidateId}
                        </td>

                        <td>
                          {candidate.fullName}
                        </td>

                        <td>
                          {candidate.email}
                        </td>

                       <td>

  <Chip
    label={candidate.status}
    color={
      candidate.status === "Approved"
        ? "success"
        : candidate.status === "Rejected"
        ? "error"
        : "warning"
    }
    size="small"
  />

</td>

                        <td>
                          {
                            new Date(
                              candidate.createdDate
                            ).toLocaleDateString()
                          }
                        </td>

                        <td>

                          <button
                            className="view-btn"
                            onClick={() =>
                              navigate(
                                `/admin/candidates/${candidate.candidateId}`
                              )
                            }
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </>

        )}

      </div>

      {showModal && (

        <AddCandidateModal
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() => {

            setShowModal(false);

            fetchDashboard();

          }}
        />

      )}

    </AdminLayout>

  );

}