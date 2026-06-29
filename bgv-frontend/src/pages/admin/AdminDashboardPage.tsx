import { useEffect, useState } from "react";

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
  getPendingCandidates,
}
from "../../services/AdminDashboardService";

import type {
  DashboardSummary,
}
from "../../types/Dashboard";

import type {
  CandidateWorkQueue,
}
from "../../types/Candidate";

export default function AdminDashboardPage() {

  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [
    pendingCandidates,
    setPendingCandidates
  ] =
    useState<CandidateWorkQueue[]>([]);

  const [showModal,
    setShowModal] =
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

        const pendingResult =
          await getPendingCandidates();

        setPendingCandidates(
          pendingResult
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

          </div>

          <button
            className="add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add Candidate
          </button>

        </div>

        {loading && (
          <h3>Loading...</h3>
        )}

        {!loading && summary && (

          <>

            <div className="dashboard-cards">

              <div className="dashboard-card">

                <h4>Total Candidates</h4>

                <h1 className="blue">
                  {summary.totalCandidates}
                </h1>

              </div>

              <div className="dashboard-card">

                <h4>Pending</h4>

                <h1 className="orange">
                  {summary.pendingCandidates}
                </h1>

              </div>

              <div className="dashboard-card">

                <h4>Approved</h4>

                <h1 className="green">
                  {summary.completedCandidates}
                </h1>

              </div>

              <div className="dashboard-card">

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
                Pending Candidates
              </h2>

              <table className="pending-table">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {pendingCandidates.map(
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
                          {candidate.status}
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