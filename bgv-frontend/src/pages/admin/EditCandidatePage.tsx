import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getCandidateById,
  updateCandidate
} from "../../services/CandidateManagementService";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Stack,
  Alert,
  Snackbar,
  InputAdornment
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function EditCandidatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        setLoading(true);
        const result = await getCandidateById(Number(id));
        setFormData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    void loadCandidate();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateCandidate(Number(id), formData);
      setSnackbar({
        open: true,
        message: "Candidate updated successfully!",
        severity: "success"
      });
      setTimeout(() => {
        navigate(`/admin/candidates/${id}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Update failed. Please try again.",
        severity: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/admin/candidates/${id}`)}
          sx={{ mb: 3, textTransform: "none", fontWeight: 600 }}
        >
          Back to Details
        </Button>

        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "text.primary", display: "flex", alignItems: "center" }}>
            <span className="candidate-emoji-icon" style={{ marginRight: "12px" }}>✏️</span> Edit Candidate Profile
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 4 }}>
            Update candidate personal information and contact details below.
          </Typography>

          <Box component="form" onSubmit={handleUpdate}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
              <Box sx={{ gridColumn: "1 / -1" }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData?.fullName || ""}
                  onChange={handleChange}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData?.email || ""}
                  onChange={handleChange}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData?.phoneNumber || ""}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/admin/candidates/${id}`)}
                disabled={saving}
                sx={{ textTransform: "none", borderRadius: "8px", px: 3 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                sx={{ textTransform: "none", borderRadius: "8px", px: 4, fontWeight: 600 }}
              >
                {saving ? "Saving..." : "Update Candidate"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
}