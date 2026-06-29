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
} from "../../services/ReviewerService";

import type {
  ReviewerAssignment,
} from "../../types/ReviewerAssignment";

export default function ReviewerDashboardPage() {

  const [assignments, setAssignments] =
    useState<ReviewerAssignment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadAssignments =
    async () => {

      try {

        const result =
          await getMyAssignments(4);

        setAssignments(result);

      }
      catch (error) {

        console.error(error);

      }
      finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    void loadAssignments();

  }, []);

  const assignedCount =
    assignments.length;

  const pendingCount =
    assignments.length;

  const approvedCount =
    assignments.filter(
      (x: any) =>
        x.status === "Approved"
    ).length;

  const rejectedCount =
    assignments.filter(
      (x: any) =>
        x.status === "Rejected"
    ).length;

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

      {/* Header */}

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
            Welcome back. Here's your
            verification summary.
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

      {/* Statistics */}

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
            value={assignedCount}
            note="Total Candidates"
            icon={
              <AssignmentIcon
                color="primary"
              />
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
            value={pendingCount}
            note="Awaiting Review"
            icon={
              <PendingActionsIcon
                color="warning"
              />
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
            value={approvedCount}
            note="Completed"
            icon={
              <CheckCircleIcon
                color="success"
              />
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
            value={rejectedCount}
            note="Need Attention"
            icon={
              <CancelIcon
                color="error"
              />
            }
            color="#dc2626"
          />

        </Grid>

      </Grid>

      {/* Main */}

      <Grid
        container
        spacing={3}
      >

        {/* Left */}

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

              <Typography
                color="text.secondary"
              >
                No assignments found.
              </Typography>

            )}

            {!loading &&
              assignments.map(
                (
                  assignment
                ) => (

                  <CandidateRow
                    key={
                      assignment.id
                    }
                    candidateId={
                      assignment.candidateId
                    }
                    name={
                      assignment.candidateName
                    }
                    email={
                      (assignment as any)
                        .candidateEmail ??
                      "Email unavailable"
                    }
                    status={
                      (assignment as any)
                        .status ??
                      "Pending"
                    }
                  />

                )
              )}

          </Paper>

        </Grid>

        {/* Right */}

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

              <Typography
                color="text.secondary"
              >
                No progress available.
              </Typography>

            )}

            {!loading &&
              assignments.map(
                (
                  assignment
                ) => (

                  <ProgressCard
                    key={
                      assignment.id
                    }
                    name={
                      assignment.candidateName
                    }
                    completed={2}
                    total={4}
                  />

                )
              )}

          </Paper>

        </Grid>

      </Grid>

    </Box>

  );

}