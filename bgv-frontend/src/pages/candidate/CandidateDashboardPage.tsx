import { useEffect, useState } from "react";

import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";

import CandidateProfileCard from "../../components/candidate/CandidateProfileCard";
import CandidateStatCard from "../../components/candidate/CandidateStatCard";
import OverallStatusCard from "../../components/candidate/OverallStatusCard";
import VerificationTable from "../../components/candidate/VerificationTable";

import {
  getCandidateDashboard,
  getCandidateVerifications,
} from "../../services/CandidatePortalService";

import type {
  CandidateDashboard,
  CandidateVerification,
} from "../../types/CandidatePortal";

export default function CandidateDashboardPage() {

  const [dashboard, setDashboard] =
    useState<CandidateDashboard | null>(null);

  const [verifications, setVerifications] =
    useState<CandidateVerification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadDashboard = async () => {

    try {

      const [dashboardResult, verificationResult] =
        await Promise.all([
          getCandidateDashboard(),
          getCandidateVerifications(),
        ]);

      setDashboard(dashboardResult);

      setVerifications(verificationResult);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadDashboard();

  }, []);

  if (loading) {

    return (

      <Box sx={{ p: 4 }}>

        <Typography>
          Loading Dashboard...
        </Typography>

      </Box>

    );

  }

  if (!dashboard) {

    return (

      <Box sx={{ p: 4 }}>

        <Typography>
          Unable to load dashboard.
        </Typography>

      </Box>

    );

  }

  return (

    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        Candidate Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 4,
        }}
      >
        Welcome back, {dashboard.candidateName}
      </Typography>

      {/* ===========================
          Profile + Overall Status
      =========================== */}

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4,
        }}
      >

        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >

          <CandidateProfileCard
            fullName={dashboard.candidateName}
            email={
              localStorage.getItem("email") ?? ""
            }
            phoneNumber="Not Available"
            appliedRole="Software Engineer"
            status={dashboard.overallStatus}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >

          <OverallStatusCard
            status={dashboard.overallStatus}
          />

        </Grid>

      </Grid>

      {/* ===========================
          Statistics
      =========================== */}

      <Grid
        container
        spacing={3}
        sx={{
          mb: 7,
        }}
      >

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >

          <CandidateStatCard
            title="Uploaded"
            subtitle="Documents"
            value={dashboard.documentsUploaded}
            color="#1976d2"
            icon={<DescriptionIcon />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >

          <CandidateStatCard
            title="Approved"
            subtitle="Verified"
            value={dashboard.approvedDocuments}
            color="#16a34a"
            icon={<CheckCircleIcon />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >

          <CandidateStatCard
            title="Pending"
            subtitle="In Review"
            value={dashboard.pendingDocuments}
            color="#f59e0b"
            icon={<PendingActionsIcon />}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 3,
          }}
        >

          <CandidateStatCard
            title="Rejected"
            subtitle="Needs Action"
            value={dashboard.rejectedDocuments}
            color="#dc2626"
            icon={<CancelIcon />}
          />

        </Grid>

      </Grid>

      {/* ===========================
          Verification Status
      =========================== */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Verification Status
      </Typography>

      <VerificationTable
        data={verifications}
      />

    </Box>

  );

}