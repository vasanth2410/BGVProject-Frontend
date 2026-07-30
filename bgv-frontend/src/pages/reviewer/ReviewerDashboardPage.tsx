import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Divider, Box, TextField, InputAdornment } from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";

import StatCard from "../../components/reviewer/StatCard";
import CandidateRow from "../../components/reviewer/CandidateRow";
import ProgressCard from "../../components/reviewer/ProgressCard";

import "../admin/AdminDashboardPage.css";

import {
  getAssignedCandidates,
  getReviewerDashboard,
} from "../../services/ReviewerService";

import type {
  ReviewerAssignment,
} from "../../types/ReviewerAssignment";

import type {
  ReviewerDashboard,
} from "../../types/ReviewerDashboard";

export default function ReviewerDashboardPage() {
  const navigate = useNavigate();

  const [assignments, setAssignments] =
    useState<ReviewerAssignment[]>([]);

  const [dashboard, setDashboard] =
    useState<ReviewerDashboard>({
      assigned: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      completionPercentage: 0,
    });

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssignments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return assignments;
    return assignments.filter((a) => {
      const name = (a.candidateName || "").toLowerCase();
      const candidateId = (a.candidateId || "").toString();
      const status = (a.status || "").toLowerCase();
      return name.includes(query) || candidateId.includes(query) || status.includes(query);
    });
  }, [assignments, searchQuery]);

  const loadData =
    async () => {

      try {

        const [
          dashboardResult,
          assignmentResult,
        ] = await Promise.all([

          getReviewerDashboard(),

          getAssignedCandidates(),

        ]);

        setDashboard(
          dashboardResult
        );

        setAssignments(
          assignmentResult
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

    void loadData();

  }, []);

  const today =
    useMemo(() => {

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

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">
        <div className="header-left-col">
          <h1 className="dashboard-title">
            Welcome back, Reviewer! 👋
          </h1>
          <p className="dashboard-subtitle">
            Welcome back. Here's your verification summary.
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
            sm: 6,
            md: 3,
          }}
        >

          <StatCard
            title="Assigned"
            value={dashboard.assigned}
            note="Total Verifications"
            icon={
              <AssignmentIcon color="primary" />
            }
            color="#1976d2"
            onClick={() => navigate("/reviewer/verifications")}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >

          <StatCard
            title="Pending"
            value={dashboard.pending}
            note="Awaiting Review"
            icon={
              <PendingActionsIcon color="warning" />
            }
            color="#f59e0b"
            onClick={() => navigate("/reviewer/verifications", { state: { filter: "Pending" } })}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >

          <StatCard
            title="Approved"
            value={dashboard.approved}
            note="Completed"
            icon={
              <CheckCircleIcon color="success" />
            }
            color="#16a34a"
            onClick={() => navigate("/reviewer/verifications", { state: { filter: "Approved" } })}
          />

        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >

          <StatCard
            title="Rejected"
            value={dashboard.rejected}
            note="Need Attention"
            icon={
              <CancelIcon color="error" />
            }
            color="#dc2626"
            onClick={() => navigate("/reviewer/verifications", { state: { filter: "Rejected" } })}
          />

        </Grid>

      </Grid>

      <Grid
        container
        spacing={3}
      >

        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >

          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              p: 3,
              minHeight: 520,
            }}
          >

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                My Assigned Candidates
              </Typography>
              <TextField
                size="small"
                placeholder="Search candidate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  width: { xs: "100%", sm: 220 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            {loading && (
              <Typography>
                Loading assignments...
              </Typography>
            )}

            {!loading &&
              filteredAssignments.length === 0 && (
                <Typography color="text.secondary">
                  {searchQuery ? "No matching candidates found." : "No assignments found."}
                </Typography>
              )}

            {!loading &&
              filteredAssignments.map(
                (assignment) => (

               <CandidateRow
  key={assignment.assignmentId}
  candidateId={assignment.candidateId}
  name={assignment.candidateName}
  email="Email unavailable"
  status={assignment.status}
/>

                )
              )}

          </Paper>

        </Grid>

        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
          sx={{ display: "flex", flexDirection: "column" }}
        >

          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              p: 2.5,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: 16,
              }}
            >
              Verification Progress
            </Typography>

            <Divider
              sx={{
                mb: 1.5,
              }}
            />

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                pr: 0.5,
                "&::-webkit-scrollbar": {
                  width: 5,
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "rgba(128,128,128,0.2)",
                  borderRadius: 3,
                },
              }}
            >
              {loading && (
                <Typography sx={{ fontSize: 13 }}>Loading...</Typography>
              )}

              {!loading && assignments.length === 0 && (
                <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                  No progress available.
                </Typography>
              )}

              {!loading &&
                assignments.map((assignment) => (
                  <ProgressCard
                    key={assignment.assignmentId}
                    name={assignment.candidateName}
                    completed={dashboard.approved}
                    total={dashboard.assigned}
                  />
                ))}
            </Box>
          </Paper>

        </Grid>

      </Grid>

    </div>

  );

}