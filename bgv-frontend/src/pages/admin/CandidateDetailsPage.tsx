import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Button,
  Stack,
  Box,
  CircularProgress
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getCandidateById,
  deleteCandidate
} from "../../services/CandidateManagementService";
import { downloadCandidatePdfReport } from "../../services/ReportService";

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        const result = await getCandidateById(Number(id));
        setCandidate(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load candidate details. Please try again.");
      }
    };
    void loadCandidate();
  }, [id]);

  if (error)
    return (
      <AdminLayout>
        <Typography sx={{ p: 4, color: 'error.main' }}>
          {error}
        </Typography>
      </AdminLayout>
    );

  if (!candidate)
    return (
      <AdminLayout>
        <Typography sx={{ p: 4 }}>
          Loading...
        </Typography>
      </AdminLayout>
    );

  const handleDelete = async () => {
    if (!window.confirm("Delete Candidate?")) return;
    await deleteCandidate(candidate.id);
    alert("Candidate Deleted Successfully");
    navigate("/admin/candidates");
  };

  const handleDownloadPdf = async () => {
    try {
      setDownloadingPdf(true);
      await downloadCandidatePdfReport(candidate.id, candidate.fullName);
    } catch (err) {
      console.error("PDF Download failed:", err);
      alert("Failed to generate PDF report. Please try again.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <AdminLayout>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          m: 3,
          borderRadius: "16px"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Candidate Details
          </Typography>

          <Button
            variant="contained"
            color="success"
            startIcon={downloadingPdf ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdfIcon />}
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(22, 163, 74, 0.25)"
            }}
          >
            {downloadingPdf ? "Generating PDF..." : "Download PDF Verification Report"}
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Name :</strong> {candidate.fullName}
            </Typography>

            <Typography>
              <strong>Email :</strong> {candidate.email}
            </Typography>

            <Typography>
              <strong>Phone :</strong> {candidate.phoneNumber}
            </Typography>

            <Typography>
              <strong>Gender :</strong> {candidate.gender}
            </Typography>

            <Typography>
              <strong>Date of Birth :</strong> {candidate.dateOfBirth}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Address :</strong> {candidate.address}
            </Typography>

            <Typography>
              <strong>PAN :</strong> {candidate.panNumber}
            </Typography>

            <Typography>
              <strong>Aadhaar :</strong> {candidate.aadhaarNumber}
            </Typography>

            <Typography>
              <strong>Applied Role :</strong> {candidate.appliedRole}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <Typography>
                <strong>Status :</strong>
              </Typography>

              <Chip
                label={candidate.status}
                color={
                  candidate.status === "Approved"
                    ? "success"
                    : candidate.status === "Rejected"
                    ? "error"
                    : "warning"
                }
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/candidates/edit/${candidate.id}`)}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Edit Candidate
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Delete Candidate
          </Button>
        </Stack>
      </Paper>
    </AdminLayout>
  );
}