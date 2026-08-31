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
  InputAdornment,
  MenuItem
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WorkIcon from "@mui/icons-material/Work";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const formatDateForInput = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch {
    return "";
  }
};

export default function EditCandidatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    panNumber: "",
    aadhaarNumber: "",
    appliedRole: "",
    dateOfJoining: "",
    status: "Pending"
  });
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
        if (result) {
          setFormData({
            fullName: result.fullName || "",
            email: result.email || "",
            phoneNumber: result.phoneNumber || "",
            address: result.address || "",
            dateOfBirth: formatDateForInput(result.dateOfBirth),
            gender: result.gender || "",
            panNumber: result.panNumber || "",
            aadhaarNumber: result.aadhaarNumber || "",
            appliedRole: result.appliedRole || "",
            dateOfJoining: formatDateForInput(result.dateOfJoining),
            status: result.status || "Pending"
          });
        }
      } catch (err) {
        console.error(err);
        setSnackbar({
          open: true,
          message: "Failed to load candidate details.",
          severity: "error"
        });
      } finally {
        setLoading(false);
      }
    };
    void loadCandidate();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateCandidate(Number(id), formData);
      setSnackbar({
        open: true,
        message: "Candidate profile updated successfully!",
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
      <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 900, mx: "auto" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/admin/candidates/${id}`)}
          sx={{ mb: 3, textTransform: "none", fontWeight: 600 }}
        >
          Back to Candidate Details
        </Button>

        <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "text.primary", display: "flex", alignItems: "center" }}>
            <span className="candidate-emoji-icon" style={{ marginRight: "12px" }}>✏️</span> Edit Candidate Profile
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 4 }}>
            Update candidate personal information, contact details, identification, role, and status.
          </Typography>

          <Box component="form" onSubmit={handleUpdate}>
            {/* Section 1: Personal & Contact Information */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon fontSize="small" /> Personal & Contact Details
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5, mb: 4 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Full Name *"
                  name="fullName"
                  value={formData.fullName}
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
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
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
                  value={formData.phoneNumber}
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

              <Box>
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <WcIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Full Residential Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1 }}>
                          <HomeIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Section 2: Identification Numbers */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
              <BadgeIcon fontSize="small" /> Identification Numbers
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2.5, mb: 4 }}>
              <Box>
                <TextField
                  fullWidth
                  label="PAN Card Number"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  placeholder="e.g. ABCDE1234F"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCardIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Aadhaar Card Number"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  placeholder="e.g. 1234 5678 9012"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <BadgeIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Section 3: Job Role & Status */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "primary.main", display: "flex", alignItems: "center", gap: 1 }}>
              <WorkIcon fontSize="small" /> Role & Verification Status
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2.5, mb: 4 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Applied Role"
                  name="appliedRole"
                  value={formData.appliedRole}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Joining"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  select
                  label="Verification Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <FactCheckIcon color="action" />
                        </InputAdornment>
                      )
                    }
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </TextField>
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