import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import StatCard from "../../components/reviewer/StatCard";
import CandidateRow from "../../components/reviewer/CandidateRow";
import ProgressCard from "../../components/reviewer/ProgressCard";

import {
  getMyAssignments,
  getReviewerDashboard,
} from "../../services/ReviewerService";

import type {
  ReviewerAssignment,
} from "../../types/ReviewerAssignment";

import type {
  ReviewerDashboard,
} from "../../types/ReviewerDashboard";

export default function ReviewerDashboardPage() {

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

  const [loading, setLoading] =
    useState(true);

  const loadData =
    async () => {

      try {

        const [
          dashboardResult,
          assignmentResult,
        ] = await Promise.all([

          getReviewerDashboard(),

          getMyAssignments(4),

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

    <Box
      sx={{
        p: 4,
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
        }}
      >

        <Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
            }}
          >
            Reviewer Dashboard
          </Typography>

          <Typography
            color="text.secondary"
          >
            Welcome back. Here's your verification summary.
          </Typography>

        </Box>

        <Typography
          color="text.secondary"
          sx={{
            fontWeight: 600,
          }}
        >
          {today}
        </Typography>

      </Box>

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

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              My Assigned Candidates
            </Typography>

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
              assignments.length === 0 && (
                <Typography color="text.secondary">
                  No assignments found.
                </Typography>
              )}

            {!loading &&
              assignments.map(
                (assignment) => (

                  <CandidateRow
                    key={assignment.id}
                    candidateId={assignment.candidateId}
                    name={assignment.candidateName}
                    email={
                      (assignment as any).candidateEmail ??
                      "Email unavailable"
                    }
                    status={
                      (assignment as any).status ??
                      "Pending"
                    }
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
        >

          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              p: 3,
              minHeight: 520,
            }}
          >

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Verification Progress
            </Typography>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            {loading && (
              <Typography>
                Loading...
              </Typography>
            )}

            {!loading &&
              assignments.length === 0 && (
                <Typography color="text.secondary">
                  No progress available.
                </Typography>
              )}

            {!loading &&
              assignments.map(
                (assignment) => (

                  <ProgressCard
                    key={assignment.id}
                    name={assignment.candidateName}
                    completed={dashboard.approved}
                    total={dashboard.assigned}
                  />

                )
              )}

          </Paper>

        </Grid>

      </Grid>

    </Box>

  );

}