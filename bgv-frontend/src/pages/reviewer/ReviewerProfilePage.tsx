import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

export default function ReviewerProfilePage() {
  const [name, setName] = useState(localStorage.getItem("name") || "Reviewer User");
  const [email, setEmail] = useState(localStorage.getItem("email") || "reviewer@test.com");
  const [employeeId, setEmployeeId] = useState(localStorage.getItem("reviewer_employeeId") || "EMP-1004");
  const [department, setDepartment] = useState(localStorage.getItem("reviewer_department") || "Background Verification");

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editEmployeeId, setEditEmployeeId] = useState(employeeId);
  const [editDepartment, setEditDepartment] = useState(department);

  const getInitials = (fullName: string) => {
    if (!fullName) return "RU";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1]?.[0] || "")).toUpperCase();
  };

  const reviewer = {
    name: name,
    email: email,
    role: "Reviewer",
    employeeId: employeeId,
    department: department,
    assignedCases: 15,
    completedReviews: 10,
    pendingReviews: 5,
    lastLogin: new Date().toLocaleString(),
  };

  const handleOpenEdit = () => {
    setEditName(name);
    setEditEmail(email);
    setEditEmployeeId(employeeId);
    setEditDepartment(department);
    setOpenEdit(true);
  };

  const handleSave = () => {
    localStorage.setItem("name", editName);
    localStorage.setItem("email", editEmail);
    localStorage.setItem("reviewer_employeeId", editEmployeeId);
    localStorage.setItem("reviewer_department", editDepartment);
    
    setName(editName);
    setEmail(editEmail);
    setEmployeeId(editEmployeeId);
    setDepartment(editDepartment);
    
    setOpenEdit(false);
    
    // Dispatch a storage event so other components refresh if needed
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 600,
          mx: "auto",
          mt: 2,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)"
        }}
      >

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >

          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: 32,
              mb: 2,
            }}
          >
            {getInitials(reviewer.name)}
          </Avatar>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            {reviewer.name}
          </Typography>

          <Typography
            color="text.secondary"
          >
            {reviewer.email}
          </Typography>

          <Chip
            label={reviewer.role}
            color="primary"
            sx={{ mt: 2 }}
          />

        </Box>

        <Grid
          container
          spacing={3}
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Employee ID
            </Typography>

            <Typography>
              {reviewer.employeeId}
            </Typography>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Department
            </Typography>

            <Typography>
              {reviewer.department}
            </Typography>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Assigned Cases
            </Typography>

            <Typography>
              {reviewer.assignedCases}
            </Typography>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Completed Reviews
            </Typography>

            <Typography>
              {reviewer.completedReviews}
            </Typography>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Pending Reviews
            </Typography>

            <Typography>
              {reviewer.pendingReviews}
            </Typography>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Last Login
            </Typography>

            <Typography>
              {reviewer.lastLogin}
            </Typography>

          </Grid>

        </Grid>

        <Box
          sx={{
            mt: 4,
            textAlign: "center",
          }}
        >

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleOpenEdit}
          >
            Edit Profile
          </Button>

        </Box>

      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Profile</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            sx={{ mb: 3, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Employee ID"
            value={editEmployeeId}
            onChange={(e) => setEditEmployeeId(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Department"
            value={editDepartment}
            onChange={(e) => setEditDepartment(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={() => setOpenEdit(false)} color="inherit" sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{ fontWeight: 600 }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}