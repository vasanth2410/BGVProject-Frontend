import { useEffect, useState, useRef } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Box,
  Avatar,
  IconButton,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BadgeIcon from "@mui/icons-material/Badge";

import { getCandidateProfile } from "../../services/CandidatePortalService";
import type { CandidateProfile } from "../../types/CandidateProfile";
import { getSavedAvatar, saveCandidateAvatar, removeCandidateAvatar } from "../../utils/avatarUtils";

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "info" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const result = await getCandidateProfile();
      setProfile(result);

      if (result) {
        const savedAvatar = getSavedAvatar(result.id, result.fullName, result.email);
        if (savedAvatar) {
          setAvatarUrl(savedAvatar);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setSnackbar({
        open: true,
        message: "Image size should be less than 5MB",
        severity: "info",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setAvatarUrl(base64Image);

      if (profile) {
        saveCandidateAvatar(base64Image, profile.id, profile.fullName, profile.email);
      } else {
        saveCandidateAvatar(base64Image);
      }

      setSnackbar({
        open: true,
        message: "Profile photo updated successfully!",
        severity: "success",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setAvatarUrl(null);
    if (profile) {
      removeCandidateAvatar(profile.id, profile.fullName, profile.email);
    } else {
      removeCandidateAvatar();
    }
    setSnackbar({
      open: true,
      message: "Profile photo removed",
      severity: "info",
    });
  };

  const getInitials = (name: string) => {
    if (!name) return "C";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (!profile) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Loading Candidate Profile...
        </Typography>
      </Box>
    );
  }

  const isApproved = profile.status === "Approved" || profile.status === "Verified";

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 2 }}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Main Profile Header Card */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.03) 100%)",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Avatar with Camera Overlay */}
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={avatarUrl || undefined}
              sx={{
                width: 100,
                height: 100,
                fontSize: 34,
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                border: "3px solid",
                borderColor: "background.paper",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              {!avatarUrl && getInitials(profile.fullName)}
            </Avatar>

            <Tooltip title="Upload Profile Photo">
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  bgcolor: "primary.main",
                  color: "white",
                  width: 34,
                  height: 34,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                    transform: "scale(1.08)",
                  },
                  transition: "all 0.2s",
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* User Info Header Summary */}
          <Box sx={{ textAlign: { xs: "center", sm: "left" }, flexGrow: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.5px" }}>
              {profile.fullName || "Candidate"}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 0.75, justifyContent: { xs: "center", sm: "flex-start" } }}>
              <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              {profile.email}
            </Typography>

            <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }}>
              <Chip
                icon={isApproved ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <AccessTimeIcon sx={{ fontSize: 16 }} />}
                label={`Status: ${profile.status || "Pending"}`}
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  px: 0.5,
                  bgcolor: isApproved ? "#dcfce7" : "#fef3c7",
                  color: isApproved ? "#15803d" : "#9a3412",
                  border: `1px solid ${isApproved ? "#86efac" : "#fde68a"}`,
                  "body.dark-mode &": {
                    bgcolor: isApproved ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)",
                    color: isApproved ? "#4ade80" : "#fbbf24",
                  },
                }}
              />

              <Button
                variant="outlined"
                size="small"
                startIcon={<PhotoCameraIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
              >
                {avatarUrl ? "Change Photo" : "Upload Photo"}
              </Button>

              {avatarUrl && (
                <Tooltip title="Remove Photo">
                  <IconButton color="error" size="small" onClick={handleRemovePhoto}>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Profile Details Form Grid */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <BadgeIcon color="primary" />
          Personal Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={profile.fullName}
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "primary.main", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              value={profile.email}
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "primary.main", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              value={profile.phoneNumber || "N/A"}
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: "primary.main", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Applied Role"
              value={profile.appliedRole || "Software Engineer / Candidate"}
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkIcon sx={{ color: "primary.main", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}