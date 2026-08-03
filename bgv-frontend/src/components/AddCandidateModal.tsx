import { useState } from "react";

import {
  createCandidate,
} from "../services/CandidateManagementService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCandidateModal({
  onClose,
  onSuccess,
}: Props) {

  const [formData, setFormData] =
    useState({
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
    });

  const isDark = document.body.classList.contains("dark-mode");
  const inputColor = isDark ? "#f8fafc" : "inherit";
  const inputStyle: any = { color: inputColor, WebkitTextFillColor: inputColor };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async () => {

      try {

        await createCandidate(
          formData
        );

        alert(
          "Candidate Created Successfully"
        );

        onSuccess();

        onClose();

      }
     catch (error: any) {

  console.error(error);

  console.log(error.response);

  alert(
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    "Failed to create candidate"
  );
}

    };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
          },
        },
        paper: {
          sx: {
            borderRadius: "16px",
            animation: "modalScaleBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            border: isDark ? "1px solid rgba(0, 240, 255, 0.3)" : "1px solid #e2e8f0",
            boxShadow: isDark
              ? "0 25px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 240, 255, 0.15)"
              : "0 20px 40px rgba(0, 0, 0, 0.2)",
            backgroundColor: isDark ? "#1a1e2d" : "#ffffff",
            color: isDark ? "#f8fafc" : "inherit",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              transition: "all 0.25s ease-in-out",
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00F0FF !important",
                  borderWidth: "2px",
                  boxShadow: "0 0 14px rgba(0, 240, 255, 0.4)",
                },
              },
            },
            "@keyframes modalScaleBounce": {
              "0%": {
                opacity: 0,
                transform: "scale(0.82) translateY(20px)",
              },
              "70%": {
                transform: "scale(1.03) translateY(-4px)",
              },
              "100%": {
                opacity: 1,
                transform: "scale(1) translateY(0)",
              },
            },
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: "24px" }}>
        Add Candidate
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Address
            </Typography>
            <TextField
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Date of Birth
            </Typography>
            <TextField
              fullWidth
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Gender
            </Typography>
            <TextField
              fullWidth
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              PAN Number
            </Typography>
            <TextField
              fullWidth
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Aadhaar Number
            </Typography>
            <TextField
              fullWidth
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Applied Role
            </Typography>
            <TextField
              fullWidth
              name="appliedRole"
              value={formData.appliedRole}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5, ml: 1, fontWeight: 500 }}>
              Date of Joining
            </Typography>
            <TextField
              fullWidth
              name="dateOfJoining"
              type="date"
              value={formData.dateOfJoining}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ htmlInput: { style: inputStyle } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ fontWeight: 600, px: 4 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}