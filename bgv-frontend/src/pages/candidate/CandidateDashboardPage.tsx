import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import CandidateProfileCard from "../../components/candidate/CandidateProfileCard";
import OverallStatusCard from "../../components/candidate/OverallStatusCard";
import VerificationTable from "../../components/candidate/VerificationTable";
import StatusBreakdownChart from "../../components/charts/StatusBreakdownChart";

import "../admin/AdminDashboardPage.css";

import {
  getCandidateDashboard,
  getCandidateVerifications,
} from "../../services/CandidatePortalService";

import type {
  CandidateDashboard,
  CandidateVerification,
} from "../../types/CandidatePortal";

export default function CandidateDashboardPage() {
  const [dashboard, setDashboard] = useState<CandidateDashboard | null>(null);
  const [verifications, setVerifications] = useState<CandidateVerification[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [dashboardResult, verificationResult] = await Promise.all([
        getCandidateDashboard(),
        getCandidateVerifications(),
      ]);
      setDashboard(dashboardResult);
      setVerifications(verificationResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
  }, []);

  const today = useMemo(() => {
    return new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography>Loading Dashboard...</Typography>
      </Box>
    );
  }

  if (!dashboard) {
    return (
      <Box>
        <Typography>Unable to load dashboard.</Typography>
      </Box>
    );
  }

  return (
    <div className="dashboard-container" style={{ padding: 0 }}>
      {/* Header Banner */}
      <div className="dashboard-header">
        <div className="header-left-col">
          <h1 className="dashboard-title">
            Welcome back, {dashboard.candidateName}! 👋
          </h1>
          <p className="dashboard-subtitle">
            Here's the status of your background verification process.
          </p>
          <div className="dashboard-date-badge">
            <CalendarTodayIcon fontSize="small" />
            <span>{today}</span>
          </div>
        </div>

        <div className="header-center-img">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/female-developer-working-on-laptop-4487955-3738435.png" alt="Dashboard Illustration" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card" style={{ cursor: "default" }}>
          <div className="card-icon-wrapper icon-blue">
            <DescriptionIcon sx={{ fontSize: 28, color: "#2563EB" }} />
          </div>
          <h4>Uploaded Documents</h4>
          <h1 className="blue">{dashboard.documentsUploaded}</h1>
          <div className="card-trend green-trend">
            <span>Total submitted files</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ cursor: "default" }}>
          <div className="card-icon-wrapper icon-green">
            <CheckCircleIcon sx={{ fontSize: 28, color: "#16A34A" }} />
          </div>
          <h4>Verified Documents</h4>
          <h1 className="green">{dashboard.approvedDocuments}</h1>
          <div className="card-trend green-trend">
            <span>Successfully approved</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ cursor: "default" }}>
          <div className="card-icon-wrapper icon-orange">
            <PendingActionsIcon sx={{ fontSize: 28, color: "#F59E0B" }} />
          </div>
          <h4>Documents in Review</h4>
          <h1 className="orange">{dashboard.pendingDocuments}</h1>
          <div className="card-trend green-trend">
            <span>Awaiting verification</span>
          </div>
        </div>

        <div className="dashboard-card" style={{ cursor: "default" }}>
          <div className="card-icon-wrapper icon-red">
            <CancelIcon sx={{ fontSize: 28, color: "#EF4444" }} />
          </div>
          <h4>Rejected / Needs Action</h4>
          <h1 className="red">{dashboard.rejectedDocuments}</h1>
          <div className="card-trend green-trend">
            <span>Requires corrections</span>
          </div>
        </div>
      </div>

      {/* Charts & Details Section */}
      <div className="charts-section">
        {/* Left Card: Profile & Progress */}
        <div className="chart-card">
          <div className="chart-title" style={{ marginBottom: "24px" }}>
            Candidate Profile Details
          </div>
          <CandidateProfileCard
            fullName={dashboard.candidateName}
            email={localStorage.getItem("email") ?? ""}
            phoneNumber="Not Available"
            appliedRole="Software Engineer"
            status={dashboard.overallStatus}
          />
          <Box sx={{ mt: 2 }}>
            <OverallStatusCard status={dashboard.overallStatus} />
          </Box>
        </div>

        {/* Right Card: Pie Chart */}
        <div className="chart-card">
          <div className="chart-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Verification Document Breakdown</span>
            <span style={{ fontSize: "14px", fontWeight: "normal", color: "#6b7280" }}>
              Total: {dashboard.documentsUploaded}
            </span>
          </div>
          <StatusBreakdownChart
            pending={dashboard.pendingDocuments}
            approved={dashboard.approvedDocuments}
            rejected={dashboard.rejectedDocuments}
          />
        </div>
      </div>

      {/* Bottom Section: Verification Table */}
      <div className="pending-section" style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
          Verification Status Checkpoints
        </h2>
        <VerificationTable data={verifications} />
      </div>
    </div>
  );
}