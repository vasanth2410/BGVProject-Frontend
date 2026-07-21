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
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
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