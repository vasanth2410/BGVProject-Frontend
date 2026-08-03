import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  TableContainer,
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useNavigate } from "react-router-dom";
import { getAssignedCandidates } from "../../services/ReviewerService";
import type { ReviewerAssignment } from "../../types/ReviewerAssignment";
import { getSavedAvatar } from "../../utils/avatarUtils";

export default function ReviewerAssignmentsPage() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState<ReviewerAssignment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const result = await getAssignedCandidates();
      setAssignments(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAssignments();
  }, []);

  const filteredAssignments = assignments.filter((a) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const name = (a.candidateName || "").toLowerCase();
    const candidateId = (a.candidateId || "").toString();
    const assignmentId = (a.assignmentId || "").toString();
    const status = (a.status || "").toLowerCase();
    return (
      name.includes(query) ||
      candidateId.includes(query) ||
      assignmentId.includes(query) ||
      status.includes(query)
    );
  });

  const getAvatarColor = (name: string) => {
    const colors = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0284c7"];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
              My Assignments
            </Typography>
            <Chip
              label={`${assignments.length} Candidates`}
              color="primary"
              size="small"
              sx={{ fontWeight: 700, borderRadius: 1.5 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Review and verify candidate background profiles assigned to you.
          </Typography>
        </Box>

        <TextField
          placeholder="Search candidate..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: "100%", sm: 260 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2.5,
            },
          }}
        />
      </Box>

      {/* Table Container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.2)",
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Table style={{ minWidth: 600 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(128, 128, 128, 0.05)" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Candidate
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Assigned Date
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, pr: 3 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">Loading assigned candidates...</Typography>
                </TableCell>
              </TableRow>
            ) : filteredAssignments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
                  <AssignmentIndIcon sx={{ fontSize: 44, color: "text.secondary", mb: 1, opacity: 0.5 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }} color="text.secondary">
                    No assignments found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {searchQuery ? "Try matching a different candidate name." : "You have no active candidate assignments at the moment."}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAssignments.map((assignment) => {
                const savedAvatar = getSavedAvatar(assignment.candidateId, assignment.candidateName);
                const avatarColor = getAvatarColor(assignment.candidateName);
                const formattedDate = new Date(assignment.assignedDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <TableRow
                    key={assignment.assignmentId}
                    sx={{
                      transition: "background-color 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(128, 128, 128, 0.04)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
                        <Avatar
                          src={savedAvatar || undefined}
                          sx={{
                            bgcolor: avatarColor,
                            width: 38,
                            height: 38,
                            fontWeight: 700,
                            fontSize: 14,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          {!savedAvatar && assignment.candidateName.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: "text.primary" }}>
                            {assignment.candidateName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            Candidate ID: #{assignment.candidateId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                        <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                          {formattedDate}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<RateReviewIcon sx={{ fontSize: 16 }} />}
                        endIcon={<ChevronRightIcon sx={{ fontSize: 16 }} />}
                        onClick={() => navigate(`/reviewer/review/${assignment.candidateId}`)}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          px: 2,
                          py: 0.75,
                          fontSize: 13,
                          boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                          "&:hover": {
                            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.35)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        Start Review
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}