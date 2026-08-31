import { useEffect, useState } from "react";

import {
  People,
  HourglassTop,
  CheckCircle,
  Cancel,
  Add,
  PersonAdd,
  Assignment,
  Assessment,
  CalendarToday,
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
import AddReviewerModal
  from "../../components/admin/AddReviewerModal";
import AnimatedCounter from "../../components/AnimatedCounter";

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

  const [
    showAddReviewerModal,
    setShowAddReviewerModal,
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

          <div className="header-left-col">

            <h1 className="dashboard-title">
              Welcome back, Admin! <span className="hand-wave-emoji">👋</span>
            </h1>

            <p className="dashboard-subtitle">
              Here's what's happening with your background verification system today.
            </p>

            <div className="dashboard-date-badge">
              <CalendarToday fontSize="small" />
              <span>{today}</span>
            </div>

          </div>

          <div className="header-center-img">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/female-developer-working-on-laptop-4487955-3738435.png" alt="Dashboard Illustration" />
          </div>

          <div className="header-right-col">

            <button
              className="add-btn primary"
              onClick={() =>
                setShowAddReviewerModal(true)
              }
            >
              <PersonAdd
                fontSize="small"
              />
              Add Reviewer
            </button>

            <button
              className="add-btn primary"
              onClick={() =>
                setShowModal(true)
              }
            >
              <Add
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

              <div className="dashboard-card" onClick={() => navigate('/admin/candidates', { state: { filter: '' } })}>

                <div className="card-icon-wrapper icon-blue">
                  <People sx={{ fontSize: 22, color: "#2563EB" }} />
                </div>

                <h4>Total Candidates</h4>

                <h1 className="blue">
                  <AnimatedCounter value={summary.totalCandidates} />
                </h1>

                <div className="card-trend green-trend">
                  <span>↑ 12% from last week</span>
                </div>

              </div>

              <div className="dashboard-card" onClick={() => navigate('/admin/candidates', { state: { filter: 'Pending' } })}>

                <div className="card-icon-wrapper icon-orange">
                  <HourglassTop sx={{ fontSize: 22, color: "#F59E0B" }} />
                </div>

                <h4>Pending</h4>

                <h1 className="orange">
                  <AnimatedCounter value={summary.pendingCandidates} />
                </h1>

                <div className="card-trend green-trend">
                  <span>↑ 8% from last week</span>
                </div>

              </div>

              <div className="dashboard-card" onClick={() => navigate('/admin/candidates', { state: { filter: 'Approved' } })}>

                <div className="card-icon-wrapper icon-green">
                  <CheckCircle sx={{ fontSize: 22, color: "#16A34A" }} />
                </div>

                <h4>Approved</h4>

                <h1 className="green">
                  <AnimatedCounter value={summary.completedCandidates} />
                </h1>

                <div className="card-trend green-trend">
                  <span>↑ 5% from last week</span>
                </div>

              </div>

              <div className="dashboard-card" onClick={() => navigate('/admin/candidates', { state: { filter: 'Rejected' } })}>

                <div className="card-icon-wrapper icon-red">
                  <Cancel sx={{ fontSize: 22, color: "#EF4444" }} />
                </div>

                <h4>Rejected</h4>

                <h1 className="red">
                  <AnimatedCounter value={summary.rejectedCandidates} />
                </h1>

                <div className="card-trend green-trend">
                  <span>↑ 2% from last week</span>
                </div>

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

                <div className="chart-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Status Breakdown</span>
                  <span style={{ fontSize: "14px", fontWeight: "normal", color: "#6b7280" }}>Total: {summary.totalCandidates}</span>
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

      <AddReviewerModal
        open={showAddReviewerModal}
        onClose={() => setShowAddReviewerModal(false)}
        onSuccess={() => setShowAddReviewerModal(false)}
      />

    </AdminLayout>

  );

}