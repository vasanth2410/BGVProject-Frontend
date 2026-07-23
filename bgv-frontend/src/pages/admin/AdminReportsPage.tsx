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
  CircularProgress
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
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        System Reports
      </Typography>

      {/* 1. PDF Verification Summary Report */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #e2e8f0",
          borderRadius: 2,
          p: 3,
          mb: 3,
          backgroundColor: "#f8fafc"
        }}
      >
        <Box sx={{ flex: 1, mr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1e293b" }}>
            📄 Candidate BGV Summary Report (PDF)
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
            Download complete official BGV PDF verification summary report with background check details, seal, and status breakdown.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
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
            sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600, px: 3 }}
          >
            {downloadingPdf ? "Generating..." : "Download PDF"}
          </Button>
        </Box>
      </Box>

      {/* 2. Excel Candidates Report */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Candidates Excel Master List
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Download complete system candidate list as Excel spreadsheet (.xlsx).
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={async () => {
            await exportCandidatesReport();
          }}
          sx={{ textTransform: "none", borderRadius: "8px" }}
        >
          Export Excel
        </Button>
      </Box>
    </Paper>
  );
}