import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  Button,
  Stack,
  Box,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ReplayIcon from "@mui/icons-material/Replay";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SchoolIcon from "@mui/icons-material/School";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BadgeIcon from "@mui/icons-material/Badge";
import ShieldIcon from "@mui/icons-material/Shield";

import { useSnackbar } from "notistack";

import {
  getVerifications,
  approveVerification,
  rejectVerification,
  reReviewVerification,
} from "../../services/ReviewerService";

import type { Verification } from "../../types/Verification";

export default function ReviewerVerificationsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [search, setSearch] = useState(location.state?.filter || "");
  const [statusTab, setStatusTab] = useState<string>("All");
  const [remarks, setRemarks] = useState<Record<number, string>>({});

  const loadVerifications = async () => {
    try {
      const result = await getVerifications();
      setVerifications(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void loadVerifications();
  }, []);

  const handleApprove = async (id: number) => {
    const remark = remarks[id];
    if (!remark?.trim()) {
      alert("Remarks required");
      return;
    }

    try {
      await approveVerification(id, remark);
      enqueueSnackbar("Verification Approved & Candidate Notified via Email", {
        variant: "success",
      });
      await loadVerifications();
    } catch {
      enqueueSnackbar("Approval Failed", {
        variant: "error",
      });
    }
  };

  const handleReject = async (id: number) => {
    const remark = remarks[id];
    if (!remark?.trim()) {
      alert("Remarks required");
      return;
    }

    try {
      await rejectVerification(id, remark);
      enqueueSnackbar("Verification Rejected & Candidate Notified via Email", {
        variant: "warning",
      });
      await loadVerifications();
    } catch {
      enqueueSnackbar("Rejection Failed", {
        variant: "error",
      });
    }
  };

  const handleReReview = async (id: number) => {
    try {
      await reReviewVerification(id);
      enqueueSnackbar("Verification moved back to Pending", {
        variant: "info",
      });
      await loadVerifications();
    } catch {
      enqueueSnackbar("Re-Review Failed", {
        variant: "error",
      });
    }
  };

  const getColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const getTypeIcon = (type: string) => {
    const lower = (type || "").toLowerCase();
    if (lower.includes("edu")) return <SchoolIcon sx={{ fontSize: 16 }} />;
    if (lower.includes("bank")) return <AccountBalanceIcon sx={{ fontSize: 16 }} />;
    if (lower.includes("kyc") || lower.includes("id")) return <BadgeIcon sx={{ fontSize: 16 }} />;
    return <ShieldIcon sx={{ fontSize: 16 }} />;
  };

  const formatTypeName = (type: string) => {
    if (!type) return "Check";
    const lower = type.toLowerCase();
    if (lower === "kyc") return "KYC Verification";
    if (lower === "bank") return "Bank Account Check";
    if (lower === "education") return "Education Verification";
    if (lower.includes("compl")) return "Compliance Check";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const deduplicatedVerifications = (() => {
    const map = new Map<string, Verification>();
    for (const v of verifications) {
      const key = `${v.candidateId}-${v.verificationType}`;
      const existing = map.get(key);
      if (!existing || (existing.status === "Pending" && v.status !== "Pending") || v.id > existing.id) {
        map.set(key, v);
      }
    }
    return Array.from(map.values());
  })();

  const filteredVerifications = deduplicatedVerifications.filter((v) => {
    const keyword = search.trim().toLowerCase();
    const typeFormatted = formatTypeName(v.verificationType).toLowerCase();
    const matchesSearch =
      !keyword ||
      v.id.toString().includes(keyword) ||
      v.candidateId.toString().includes(keyword) ||
      (v.verificationType || "").toLowerCase().includes(keyword) ||
      typeFormatted.includes(keyword) ||
      (v.status || "").toLowerCase().includes(keyword) ||
      (v.reviewerRemarks || "").toLowerCase().includes(keyword);

    const matchesStatus =
      statusTab === "All" || v.status.toLowerCase() === statusTab.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const pendingCount = deduplicatedVerifications.filter((v) => v.status === "Pending").length;
  const approvedCount = deduplicatedVerifications.filter((v) => v.status === "Approved").length;
  const rejectedCount = deduplicatedVerifications.filter((v) => v.status === "Rejected").length;

  // 🟢 EXPORT TO EXCEL (CSV)
  const handleExportExcel = () => {
    if (filteredVerifications.length === 0) {
      enqueueSnackbar("No verifications to export", { variant: "warning" });
      return;
    }

    const headers = ["Verification ID", "Candidate ID", "Verification Type", "Status", "Reviewer Remarks"];
    const rows = filteredVerifications.map((v) => [
      v.id,
      v.candidateId,
      `"${formatTypeName(v.verificationType).replace(/"/g, '""')}"`,
      `"${(v.status || "").replace(/"/g, '""')}"`,
      `"${(v.reviewerRemarks || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BGV_Verifications_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    enqueueSnackbar("Verifications report exported to Excel (CSV) successfully!", { variant: "success" });
  };

  // 🔴 EXPORT TO PDF REPORT / PRINT
  const handleExportPdf = () => {
    if (filteredVerifications.length === 0) {
      enqueueSnackbar("No verifications to export", { variant: "warning" });
      return;
    }

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      enqueueSnackbar("Please allow popups to generate PDF report", { variant: "error" });
      return;
    }

    const rowsHtml = filteredVerifications
      .map(
        (v) => `
      <tr>
        <td style="padding:10px; border:1px solid #cbd5e1;">${v.id}</td>
        <td style="padding:10px; border:1px solid #cbd5e1;">Candidate #${v.candidateId}</td>
        <td style="padding:10px; border:1px solid #cbd5e1;"><strong>${formatTypeName(v.verificationType)}</strong></td>
        <td style="padding:10px; border:1px solid #cbd5e1;">
          <span style="padding:4px 10px; border-radius:12px; font-weight:bold; font-size:12px; color:white; background-color:${
            v.status === "Approved" ? "#16a34a" : v.status === "Rejected" ? "#dc2626" : "#d97706"
          };">${v.status}</span>
        </td>
        <td style="padding:10px; border:1px solid #cbd5e1;">${v.reviewerRemarks || "N/A"}</td>
      </tr>`
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>BGV Verification Summary Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 25px; color: #1e293b; }
          .header { text-align: center; margin-bottom: 25px; border-bottom: 3px solid #2563eb; padding-bottom: 12px; }
          .header h2 { margin: 0; color: #1e3a8a; font-size: 22px; }
          .header p { margin: 6px 0 0 0; color: #64748b; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
          th { background-color: #f1f5f9; color: #0f172a; padding: 10px; text-align: left; border: 1px solid #cbd5e1; font-weight: bold; }
          .footer { margin-top: 35px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>🛡️ BGV SYSTEM - VERIFICATION SUMMARY REPORT</h2>
          <p>Generated Date: ${new Date().toLocaleString("en-IN")} | Total Filtered Records: ${filteredVerifications.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Candidate Reference</th>
              <th>Verification Check</th>
              <th>Status</th>
              <th>Reviewer Remarks</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
        <div class="footer">
          Confidential Document - Enterprise Background Verification (BGV) System
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    enqueueSnackbar("PDF Report initialized for print/download!", { variant: "info" });
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Header & Export Actions */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.2)",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <VerifiedIcon color="primary" sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Verifications Management
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Review, approve, reject, and export candidate verification checks.
            </Typography>
          </Box>

          {/* Export Action Buttons */}
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              color="success"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportExcel}
              sx={{
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 600,
                px: 2,
              }}
            >
              Export Excel / CSV
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<PictureAsPdfIcon />}
              onClick={handleExportPdf}
              sx={{
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 600,
                px: 2,
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
              }}
            >
              Export PDF Report
            </Button>
          </Stack>
        </Box>

        {/* Filter Controls & Search */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pt: 1,
            borderTop: "1px solid rgba(128, 128, 128, 0.1)",
          }}
        >
          {/* Status Tabs */}
          <Tabs
            value={statusTab}
            onChange={(_, newValue) => setStatusTab(newValue)}
            sx={{
              minHeight: 40,
              "& .MuiTab-root": {
                minHeight: 40,
                fontWeight: 600,
                fontSize: 14,
                textTransform: "none",
                px: 2,
                color: "#94a3b8",
                transition: "color 0.2s",
                "&:hover": {
                  color: "#e2e8f0",
                },
                "&.Mui-selected": {
                  color: "#3b82f6",
                  fontWeight: 700,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#3b82f6",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label={`All (${deduplicatedVerifications.length})`} value="All" />
            <Tab label={`Pending (${pendingCount})`} value="Pending" />
            <Tab label={`Approved (${approvedCount})`} value="Approved" />
            <Tab label={`Rejected (${rejectedCount})`} value="Rejected" />
          </Tabs>

          <TextField
            size="small"
            placeholder="Search by ID, type, remarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 260 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />
        </Box>
      </Paper>

      {/* Verifications Table */}
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
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(128, 128, 128, 0.05)" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Verification ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Candidate ID
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Existing Remarks
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                New Remarks
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredVerifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary" fontWeight={500}>
                    No verifications match the current filter or search criteria.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredVerifications.map((v) => (
                <TableRow
                  key={v.id}
                  sx={{
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: "rgba(128, 128, 128, 0.04)",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                    #{v.id}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600 }}>
                    Candidate #{v.candidateId}
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 0.75,
                          borderRadius: 1.5,
                          bgcolor: "rgba(37, 99, 235, 0.1)",
                          color: "#2563eb",
                        }}
                      >
                        {getTypeIcon(v.verificationType)}
                      </Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 13.5 }}>
                        {formatTypeName(v.verificationType)}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={v.status}
                      color={getColor(v.status) as any}
                      size="small"
                      sx={{ fontWeight: 700, borderRadius: 1.5 }}
                    />
                  </TableCell>

                  <TableCell sx={{ color: v.reviewerRemarks ? "text.primary" : "text.secondary", fontSize: 13 }}>
                    {v.reviewerRemarks || "No remarks provided"}
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      placeholder="Enter remarks..."
                      value={remarks[v.id] || ""}
                      onChange={(e) =>
                        setRemarks({
                          ...remarks,
                          [v.id]: e.target.value,
                        })
                      }
                      sx={{
                        width: 170,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon sx={{ fontSize: 15 }} />}
                        onClick={() => navigate(`/reviewer/verifications/${v.id}`)}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                      >
                        View
                      </Button>

                      {v.status === "Pending" && (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<CheckCircleIcon sx={{ fontSize: 15 }} />}
                            onClick={() => handleApprove(v.id)}
                            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                          >
                            Approve
                          </Button>

                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            startIcon={<CancelIcon sx={{ fontSize: 15 }} />}
                            onClick={() => handleReject(v.id)}
                            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {v.status === "Rejected" && (
                        <Button
                          size="small"
                          variant="contained"
                          color="warning"
                          startIcon={<ReplayIcon sx={{ fontSize: 15 }} />}
                          onClick={() => handleReReview(v.id)}
                          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                        >
                          Re-Review
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}