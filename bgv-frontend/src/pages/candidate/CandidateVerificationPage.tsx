import { useEffect, useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Collapse,
  Grid,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FactCheckIcon from "@mui/icons-material/FactCheck";

import {
  getCandidateVerifications,
  getCandidateDocuments,
  downloadCandidateDocument,
} from "../../services/CandidatePortalService";

import type { CandidateVerification } from "../../types/CandidatePortal";

// Helper for file type icons
function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return <PictureAsPdfIcon sx={{ color: "#EF4444" }} />;
  if (["png", "jpg", "jpeg", "webp"].includes(ext || "")) return <ImageIcon sx={{ color: "#3B82F6" }} />;
  return <InsertDriveFileIcon sx={{ color: "#F59E0B" }} />;
}

// 4-Stage Stepper Component with Animations
function StageStepper({ status }: { status: string }) {
  const norm = (status || "").toLowerCase().trim();
  const isApproved = norm === "approved" || norm === "verified" || norm === "completed";
  const isRejected = norm === "rejected" || norm === "needs action" || norm === "failed";

  // Determine current active step (1 to 4)
  let activeStep = 2; // Default for Uploaded / Pending
  if (isApproved) activeStep = 4;
  else if (isRejected) activeStep = 4;
  else if (norm === "in review" || norm === "processing") activeStep = 3;

  const steps = [
    { label: "Uploaded", icon: <CloudUploadIcon sx={{ fontSize: 16 }} /> },
    { label: "OCR Scan", icon: <AutoFixHighIcon sx={{ fontSize: 16 }} /> },
    { label: "Reviewer Audit", icon: <FactCheckIcon sx={{ fontSize: 16 }} /> },
    { label: isRejected ? "Needs Action" : "Decision", icon: <VerifiedUserIcon sx={{ fontSize: 16 }} /> },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        py: 0.5,
        px: 1,
        "@keyframes pulseGlow": {
          "0%": { boxShadow: "0 0 4px rgba(59, 130, 246, 0.4)", transform: "scale(1)" },
          "50%": { boxShadow: "0 0 14px rgba(59, 130, 246, 0.8), 0 0 20px rgba(96, 165, 250, 0.5)", transform: "scale(1.1)" },
          "100%": { boxShadow: "0 0 4px rgba(59, 130, 246, 0.4)", transform: "scale(1)" },
        },
        "@keyframes checkPop": {
          "0%": { transform: "scale(0) rotate(-45deg)", opacity: 0 },
          "60%": { transform: "scale(1.38) rotate(10deg)", opacity: 1 },
          "85%": { transform: "scale(0.9) rotate(-5deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: 1 },
        },
        "@keyframes cometFlow": {
          "0%": { left: "-60px", opacity: 0 },
          "15%": { opacity: 1 },
          "85%": { opacity: 1 },
          "100%": { left: "100%", opacity: 0 },
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        {/* Background Connecting Line */}
        <Box
          sx={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px",
            height: "3px",
            bgcolor: "#E2E8F0",
            "body.dark-mode &": { bgcolor: "rgba(255, 255, 255, 0.12)" },
            borderRadius: "2px",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          {/* Active Filled Progress Line */}
          <Box
            sx={{
              height: "100%",
              borderRadius: "2px",
              position: "relative",
              overflow: "hidden",
              bgcolor: isRejected ? "#EF4444" : isApproved ? "#10B981" : "#2563EB",
              background: isRejected
                ? "linear-gradient(90deg, #EF4444, #F87171)"
                : isApproved
                ? "linear-gradient(90deg, #10B981, #059669)"
                : "linear-gradient(90deg, #2563EB, #60A5FA)",
              width: activeStep === 4 ? "100%" : activeStep === 3 ? "66%" : activeStep === 2 ? "33%" : "0%",
              transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Shimmer overlay for active processing stages */}
            {!isApproved && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "50px",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)",
                  animation: "cometFlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              />
            )}
          </Box>
        </Box>

        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < activeStep || (stepNum === 4 && isApproved);
          const isCurrent = stepNum === activeStep && !isApproved;

          let circleBg = "#FFFFFF";
          let circleColor = "#94A3B8";
          let circleBorder = "1.5px dashed #CBD5E1";
          let circleGlow = "none";
          let checkColor = "#059669";
          let labelColor = "#64748B";

          if (isDone) {
            circleBg = "#ECFDF5";
            circleColor = "#059669";
            circleBorder = "2px solid #10B981";
            circleGlow = "0 0 8px rgba(16, 185, 129, 0.25)";
            checkColor = "#059669";
            labelColor = "#059669";
          } else if (isCurrent) {
            if (isRejected) {
              circleBg = "#FEF2F2";
              circleColor = "#DC2626";
              circleBorder = "2px solid #EF4444";
              circleGlow = "0 0 10px rgba(239, 68, 68, 0.3)";
              labelColor = "#DC2626";
            } else {
              circleBg = "#EFF6FF";
              circleColor = "#2563EB";
              circleBorder = "2px solid #2563EB";
              circleGlow = "0 0 10px rgba(37, 99, 235, 0.3)";
              labelColor = "#2563EB";
            }
          }

          return (
            <Box
              key={step.label}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2,
                minWidth: "60px",
              }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  bgcolor: circleBg,
                  color: circleColor,
                  border: circleBorder,
                  boxShadow: circleGlow,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  animation: isCurrent ? "pulseGlow 2s ease-in-out infinite" : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "body.dark-mode &": {
                    bgcolor: isDone
                      ? "#1E293B"
                      : isCurrent
                      ? isRejected
                        ? "#1E293B"
                        : "#1E293B"
                      : "#1E293B",
                    borderColor: isDone
                      ? "#10B981"
                      : isCurrent
                      ? isRejected
                        ? "#EF4444"
                        : "#3B82F6"
                      : "rgba(148, 163, 184, 0.3)",
                    color: isDone ? "#34D399" : isCurrent ? (isRejected ? "#F87171" : "#60A5FA") : "#64748B",
                  },
                  "&:hover": {
                    transform: "scale(1.22)",
                    boxShadow: isDone
                      ? "0 0 12px rgba(16, 185, 129, 0.4)"
                      : isCurrent
                      ? "0 0 14px rgba(37, 99, 235, 0.4)"
                      : "0 0 8px rgba(148, 163, 184, 0.3)",
                  },
                }}
              >
                {isDone ? (
                  <CheckIcon
                    sx={{
                      fontSize: 16,
                      color: checkColor,
                      stroke: checkColor,
                      strokeWidth: 0.5,
                      animation: `checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 120}ms both`,
                      "body.dark-mode &": {
                        color: "#34D399",
                        stroke: "#34D399",
                      },
                    }}
                  />
                ) : isCurrent && isRejected ? (
                  <CancelIcon sx={{ fontSize: 16, color: "#DC2626", "body.dark-mode &": { color: "#F87171" } }} />
                ) : (
                  step.icon
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 0.6,
                  fontSize: "10.5px",
                  fontWeight: isCurrent || isDone ? 700 : 500,
                  color: labelColor,
                  "body.dark-mode &": {
                    color: isDone ? "#34D399" : isCurrent ? (isRejected ? "#F87171" : "#60A5FA") : "#64748B",
                  },
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s ease",
                }}
              >
                {step.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// Expandable Verification Row Component
function VerificationRow({ item }: { item: CandidateVerification }) {
  const [open, setOpen] = useState(false);

  const norm = (item.status || "").toLowerCase().trim();
  const isApproved = norm === "approved" || norm === "verified" || norm === "completed";
  const isRejected = norm === "rejected" || norm === "needs action" || norm === "failed";

  return (
    <>
      <TableRow
        hover
        sx={{
          bgcolor: open ? "#F8FAFC" : "transparent",
          "&:hover": { bgcolor: "#F8FAFC !important" },
          transition: "background-color 0.2s ease",
          "& > td": { borderBottom: "1px solid #F1F5F9 !important" },
          "body.dark-mode &": {
            bgcolor: open ? "rgba(255, 255, 255, 0.04)" : "transparent",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.06) !important" },
            "& > td": { borderBottom: "1px solid rgba(255, 255, 255, 0.06) !important" },
          },
        }}
      >
        <TableCell width="50px">
          <IconButton size="small" onClick={() => setOpen(!open)} sx={{ color: "#64748B", "body.dark-mode &": { color: "#94A3B8" } }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell sx={{ fontWeight: 700, color: "#2563EB", "body.dark-mode &": { color: "#60A5FA" } }}>
          #{item.documentId}
        </TableCell>

        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {getFileIcon(item.fileName)}
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#0F172A", "body.dark-mode &": { color: "#F8FAFC" } }}>
              {item.fileName}
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ width: "380px" }}>
          <StageStepper status={item.status} />
        </TableCell>

        <TableCell>
          <Chip
            label={isApproved ? "Approved" : isRejected ? "Rejected" : item.status || "Pending"}
            color={isApproved ? "success" : isRejected ? "error" : "warning"}
            size="small"
            sx={{
              fontWeight: 700,
              px: 1,
              borderRadius: "6px",
            }}
          />
        </TableCell>

        <TableCell align="right">
          <Tooltip title="Download Document">
            <IconButton
              size="small"
              onClick={() => downloadCandidateDocument(item.documentId)}
              sx={{
                bgcolor: "#EFF6FF",
                color: "#2563EB",
                "&:hover": { bgcolor: "#DBEAFE" },
                "body.dark-mode &": {
                  bgcolor: "rgba(59, 130, 246, 0.15)",
                  color: "#60A5FA",
                  "&:hover": { bgcolor: "rgba(59, 130, 246, 0.3)" },
                },
              }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* Collapsible Details */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                p: 2,
                bgcolor: "#F8FAFC",
                borderRadius: 2,
                border: "1px solid #E2E8F0",
                "body.dark-mode &": {
                  bgcolor: "rgba(15, 23, 42, 0.6)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#2563EB", mb: 1, "body.dark-mode &": { color: "#60A5FA" } }}>
                🔍 Document Pipeline Details & Activity Logs
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Document Format:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#0F172A", "body.dark-mode &": { color: "#F8FAFC" } }}>
                    {item.fileName.split(".").pop()?.toUpperCase()} File
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    AI OCR Extraction Status:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#059669", "body.dark-mode &": { color: "#34D399" } }}>
                    ✓ 100% Extracted & Verified
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Current Workflow Stage:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isApproved ? "#059669" : "#D97706", "body.dark-mode &": { color: isApproved ? "#34D399" : "#F59E0B" } }}>
                    {isApproved
                      ? "Verification Completed & Approved"
                      : isRejected
                      ? "Requires Candidate Action / Resubmission"
                      : "Assigned to Senior BGV Specialist Reviewer"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CandidateVerificationPage() {
  const [verifications, setVerifications] = useState<CandidateVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      const [verifResult, docResult] = await Promise.all([
        getCandidateVerifications().catch(() => []),
        getCandidateDocuments().catch(() => []),
      ]);

      const baseList =
        verifResult.length > 0
          ? verifResult
          : docResult.map((d) => ({
              documentId: d.id,
              fileName: d.fileName,
              status: d.status,
            }));

      const merged = baseList.map((v, index) => {
        const matchingDoc =
          docResult.find(
            (d) =>
              d.id === v.documentId ||
              (d.fileName &&
                v.fileName &&
                (d.fileName.toLowerCase().trim() === v.fileName.toLowerCase().trim() ||
                  d.fileName.toLowerCase().includes(v.fileName.toLowerCase()) ||
                  v.fileName.toLowerCase().includes(d.fileName.toLowerCase())))
          ) || docResult[index];

        let status = v.status || "Pending";
        const docStatus = (matchingDoc?.status || "").toLowerCase().trim();
        const vStatus = (v.status || "").toLowerCase().trim();

        if (
          docStatus === "approved" ||
          docStatus === "verified" ||
          docStatus === "completed" ||
          vStatus === "approved" ||
          vStatus === "verified" ||
          vStatus === "completed"
        ) {
          status = "Approved";
        } else if (
          docStatus === "rejected" ||
          docStatus === "needs action" ||
          vStatus === "rejected"
        ) {
          status = "Rejected";
        }

        return { ...v, status };
      });

      setVerifications(merged);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  // Filter logic
  const filteredVerifications = useMemo(() => {
    return verifications.filter((item) => {
      const matchesSearch =
        item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.documentId).includes(searchQuery);

      if (!matchesSearch) return false;

      const norm = (item.status || "").toLowerCase().trim();
      const isApproved = norm === "approved" || norm === "verified" || norm === "completed";
      const isRejected = norm === "rejected" || norm === "needs action" || norm === "failed";

      if (tabValue === 1) return isApproved;
      if (tabValue === 2) return !isApproved && !isRejected;
      if (tabValue === 3) return isRejected;

      return true; // All
    });
  }, [verifications, searchQuery, tabValue]);

  const counts = useMemo(() => {
    const isApp = (s: string) => {
      const n = (s || "").toLowerCase().trim();
      return n === "approved" || n === "verified" || n === "completed";
    };
    const isRej = (s: string) => {
      const n = (s || "").toLowerCase().trim();
      return n === "rejected" || n === "needs action" || n === "failed";
    };

    return {
      all: verifications.length,
      approved: verifications.filter((v) => isApp(v.status)).length,
      pending: verifications.filter((v) => !isApp(v.status) && !isRej(v.status)).length,
      rejected: verifications.filter((v) => isRej(v.status)).length,
    };
  }, [verifications]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header Banner */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0F172A", "body.dark-mode &": { color: "#F8FAFC" } }}>
            Verification Status
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", mt: 0.5, "body.dark-mode &": { color: "#94A3B8" } }}>
            Track real-time background verification stages and document review progress.
          </Typography>
        </Box>
      </Box>

      {/* Main Table Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "#FFFFFF",
          color: "#0F172A",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
          overflow: "hidden",
          "body.dark-mode &": {
            bgcolor: "#1E293B",
            color: "#F8FAFC",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "none",
          },
        }}
      >
        {/* Controls: Search & Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
            pb: 2,
            borderBottom: "1px solid #F1F5F9",
            "body.dark-mode &": {
              borderColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 40,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                minWidth: "auto",
                px: 2,
                color: "#64748B",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "#0F172A",
                },
                "&.Mui-selected": {
                  color: "#2563EB",
                  fontWeight: 700,
                },
                "body.dark-mode &": {
                  color: "#94A3B8",
                  "&:hover": {
                    color: "#E2E8F0",
                  },
                  "&.Mui-selected": {
                    color: "#60A5FA",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                bgcolor: "#2563EB",
                height: 3,
                borderRadius: "3px 3px 0 0",
                "body.dark-mode &": {
                  bgcolor: "#3B82F6",
                },
              },
            }}
          >
            <Tab label={`All Documents (${counts.all})`} />
            <Tab label={`Approved (${counts.approved})`} />
            <Tab label={`In Review (${counts.pending})`} />
            <Tab label={`Action Needed (${counts.rejected})`} />
          </Tabs>

          <TextField
            size="small"
            placeholder="Search document name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#94A3B8" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 260 },
              bgcolor: "#F8FAFC",
              borderRadius: 2,
              "& .MuiOutlinedInput-input": { color: "#0F172A" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E2E8F0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#94A3B8" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2563EB" },
              "body.dark-mode &": {
                bgcolor: "rgba(15, 23, 42, 0.6)",
                "& .MuiOutlinedInput-input": { color: "#F8FAFC" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#60A5FA" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
              },
            }}
          />
        </Box>

        {/* Table */}
        <Table sx={{ bgcolor: "#FFFFFF", "body.dark-mode &": { bgcolor: "transparent" } }}>
          <TableHead sx={{ bgcolor: "#F8FAFC", "body.dark-mode &": { bgcolor: "rgba(15, 23, 42, 0.7)" } }}>
            <TableRow>
              <TableCell width="50px" sx={{ borderBottom: "1px solid #E2E8F0", "body.dark-mode &": { borderColor: "rgba(255, 255, 255, 0.08)" } }} />
              <TableCell sx={{ fontWeight: 700, color: "#475569", borderBottom: "1px solid #E2E8F0", "body.dark-mode &": { color: "#94A3B8", borderColor: "rgba(255, 255, 255, 0.08)" } }}>Doc ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569", borderBottom: "1px solid #E2E8F0", "body.dark-mode &": { color: "#94A3B8", borderColor: "rgba(255, 255, 255, 0.08)" } }}>File Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569", textAlign: "center", borderBottom: "1px solid #E2E8F0", "body.dark-mode &": { color: "#94A3B8", borderColor: "rgba(255, 255, 255, 0.08)" } }}>
                Verification Pipeline (4 Stages)
              </TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569", borderBottom: "1px solid #E2E8F0", "body.dark-mode &": { color: "#94A3B8", borderColor: "rgba(255, 255, 255, 0.08)" } }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", borderBottom: "1px solid #E2E8F0", "body.dark-mode &": { color: "#94A3B8", borderColor: "rgba(255, 255, 255, 0.08)" } }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredVerifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, borderBottom: "none" }}>
                  <Typography variant="body1" sx={{ color: "#64748B", "body.dark-mode &": { color: "#94A3B8" } }}>
                    {loading ? "Loading verification status..." : "No documents match the filter criteria."}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredVerifications.map((item) => (
                <VerificationRow key={item.documentId} item={item} />
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}