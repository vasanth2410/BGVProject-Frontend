import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Divider
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { exportCandidatesReport, downloadCandidatePdfReport } from "../../services/ReportService";
import { getCandidates } from "../../services/CandidateManagementService";

export default function AdminReportsPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | "">("");
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
        if (data.length > 0) {
          setSelectedCandidateId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load candidates for reports:", err);
      }
    };
    void loadCandidates();
  }, []);

  const handleDownloadPdf = async () => {
    if (!selectedCandidateId) return;
    try {
      setDownloadingPdf(true);
      const cand = candidates.find(c => c.id === selectedCandidateId);
      await downloadCandidatePdfReport(Number(selectedCandidateId), cand?.fullName);
    } catch (err) {
      console.error(err);
      alert("Failed to download PDF report. Please try again.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", fontSize: { xs: "1.5rem", sm: "2.125rem" } }}>
        <Box
          component="span"
          sx={{
            display: "inline-block",
            mr: 1.5,
            animation: "chartPulse 2.5s infinite ease-in-out",
            transformOrigin: "bottom center",
            "@keyframes chartPulse": {
              "0%": { transform: "scale(1) translateY(0)" },
              "20%": { transform: "scale(1.2) translateY(-3px)" },
              "40%": { transform: "scale(1.1) rotate(6deg)" },
              "60%": { transform: "scale(1.05) rotate(-4deg)" },
              "80%": { transform: "scale(1) translateY(0)" },
              "100%": { transform: "scale(1) translateY(0)" }
            }
          }}
        >
          📊
        </Box>
        System Reports
      </Typography>

      {/* 1. Excel Candidates Report */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: { xs: 2, md: 0 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          backgroundColor: "action.hover",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 4,
            borderColor: "primary.main",
            transform: "translateY(-2px)"
          }
        }}
      >
        <Box sx={{ flex: 1, mr: { xs: 0, md: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
            Candidates Excel Master List
          </Typography>

          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
            Download complete system candidate list as Excel spreadsheet (.xlsx).
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={async () => {
            await exportCandidatesReport();
          }}
          sx={{ textTransform: "none", borderRadius: "8px", width: { xs: "100%", md: "auto" }, whiteSpace: "nowrap", flexShrink: 0 }}
        >
          Export Excel
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* 2. PDF Verification Summary Report */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          backgroundColor: "action.hover",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 4,
            borderColor: "primary.main",
            transform: "translateY(-2px)"
          }
        }}
      >
        <Box sx={{ flex: 1, mr: { xs: 0, md: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
            📄 Candidate BGV Summary Report (PDF)
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
            Download complete official BGV PDF verification summary report with background check details, seal, and status breakdown.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "stretch", gap: 2, width: { xs: "100%", md: "auto" } }}>
          <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 200 }, width: { xs: "100%", sm: "auto" } }}>
            <InputLabel id="select-candidate-label">Select Candidate</InputLabel>
            <Select
              labelId="select-candidate-label"
              value={selectedCandidateId}
              label="Select Candidate"
              onChange={(e) => setSelectedCandidateId(Number(e.target.value))}
            >
              {candidates.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.fullName} ({c.status})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="success"
            startIcon={downloadingPdf ? <CircularProgress size={18} color="inherit" /> : <PictureAsPdfIcon />}
            onClick={handleDownloadPdf}
            disabled={!selectedCandidateId || downloadingPdf}
            sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600, px: 3, width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap", flexShrink: 0 }}
          >
            {downloadingPdf ? "Generating..." : "Download PDF"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}