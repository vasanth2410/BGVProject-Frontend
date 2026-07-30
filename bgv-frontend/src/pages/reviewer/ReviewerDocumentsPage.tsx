import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TableContainer,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderZipIcon from "@mui/icons-material/FolderZip";

import { getReviewerDocuments } from "../../services/ReviewerService";
import type { ReviewerDocument } from "../../types/ReviewerDocument";

export default function ReviewerDocumentsPage() {
  const [documents, setDocuments] = useState<ReviewerDocument[]>([]);
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState<string>("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getReviewerDocuments();
        setDocuments(result);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    void loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Pending":
        return "warning";
      case "Uploaded":
        return "info";
      default:
        return "primary";
    }
  };

  const getFileTypeConfig = (fileName: string, fileType: string) => {
    const nameLower = (fileName || "").toLowerCase();
    const typeLower = (fileType || "").toLowerCase();

    if (nameLower.endsWith(".pdf") || typeLower.includes("pdf")) {
      return {
        icon: <PictureAsPdfIcon sx={{ fontSize: 18, color: "#f87171" }} />,
        bg: "rgba(239, 68, 68, 0.2)",
        textColor: "#fca5a5",
        label: "PDF",
      };
    }

    if (
      nameLower.endsWith(".doc") ||
      nameLower.endsWith(".docx") ||
      typeLower.includes("word") ||
      typeLower.includes("doc")
    ) {
      return {
        icon: <DescriptionIcon sx={{ fontSize: 18, color: "#60a5fa" }} />,
        bg: "rgba(37, 99, 235, 0.2)",
        textColor: "#93c5fd",
        label: "DOC",
      };
    }

    if (
      nameLower.endsWith(".png") ||
      nameLower.endsWith(".jpg") ||
      nameLower.endsWith(".jpeg") ||
      typeLower.includes("image")
    ) {
      return {
        icon: <ImageIcon sx={{ fontSize: 18, color: "#c084fc" }} />,
        bg: "rgba(168, 85, 247, 0.2)",
        textColor: "#e9d5ff",
        label: "IMG",
      };
    }

    return {
      icon: <InsertDriveFileIcon sx={{ fontSize: 18, color: "#2dd4bf" }} />,
      bg: "rgba(13, 148, 136, 0.2)",
      textColor: "#99f6e4",
      label: fileType || "FILE",
    };
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return "240 KB";
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const filteredDocuments = documents.filter((doc) => {
    const keyword = search.trim().toLowerCase();
    const typeConfig = getFileTypeConfig(doc.fileName, doc.fileType);

    const matchesSearch =
      !keyword ||
      (doc.fileName || "").toLowerCase().includes(keyword) ||
      (doc.fileType || "").toLowerCase().includes(keyword) ||
      (typeConfig.label || "").toLowerCase().includes(keyword) ||
      (doc.status || "").toLowerCase().includes(keyword) ||
      (doc.id || "").toString().includes(keyword);

    const matchesStatus =
      statusTab === "All" || (doc.status || "").toLowerCase() === statusTab.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const uploadedCount = documents.filter((d) => (d.status || "").toLowerCase() === "uploaded").length;
  const approvedCount = documents.filter((d) => (d.status || "").toLowerCase() === "approved").length;

  return (
    <Box sx={{ p: 1 }}>
      {/* Header Panel */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.15)",
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
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Candidate Documents
              </Typography>
              <Chip
                label={`${documents.length} Files`}
                color="primary"
                size="small"
                sx={{ fontWeight: 700, borderRadius: 1.5 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage and review background verification documents uploaded by candidates.
            </Typography>
          </Box>
        </Box>

        {/* Filter Tabs & Search Bar */}
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
            <Tab label={`All (${documents.length})`} value="All" />
            <Tab label={`Uploaded (${uploadedCount})`} value="Uploaded" />
            <Tab label={`Approved (${approvedCount})`} value="Approved" />
          </Tabs>

          <TextField
            size="small"
            placeholder="Search document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              width: { xs: "100%", sm: 260 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />
        </Box>
      </Paper>

      {/* Glassmorphic Table Container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.15)",
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Table sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(128, 128, 128, 0.05)" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                File Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Size
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Status
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <FolderZipIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1, opacity: 0.5 }} />
                  <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                    No documents found matching criteria.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => {
                const typeConfig = getFileTypeConfig(doc.fileName, doc.fileType);

                return (
                  <TableRow
                    key={doc.id}
                    sx={{
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(128, 128, 128, 0.04)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: typeConfig.bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {typeConfig.icon}
                        </Box>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: "text.primary" }}>
                            {doc.fileName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={typeConfig.label}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: 11,
                          height: 22,
                          bgcolor: typeConfig.bg,
                          color: typeConfig.textColor,
                          border: `1px solid ${typeConfig.textColor}50`,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", fontSize: 13 }}>
                        {formatFileSize(doc.fileSize)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={doc.status}
                        color={getStatusColor(doc.status) as any}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 1.5 }}
                      />
                    </TableCell>

                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<VisibilityIcon sx={{ fontSize: 15 }} />}
                          onClick={() =>
                            window.open(
                              `https://localhost:7006/api/Documents/download/${doc.id}`,
                              "_blank"
                            )
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          View
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                          onClick={() =>
                            (window.location.href = `https://localhost:7006/api/Documents/download/${doc.id}`)
                          }
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                          }}
                        >
                          Download
                        </Button>
                      </Box>
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