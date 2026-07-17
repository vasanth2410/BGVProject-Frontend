import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AdminLayout from "../../layouts/AdminLayout";
import "./AdminDashboardPage.css";

export default function AdminProfilePage() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "admin@test.com");
  const [name, setName] = useState(localStorage.getItem("name") || "Admin User");
  
  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);

  const initial = email.charAt(0).toUpperCase();

  const handleSave = () => {
    localStorage.setItem("name", editName);
    localStorage.setItem("email", editEmail);
    setName(editName);
    setEmail(editEmail);
    setOpenEdit(false);
    
    // Optionally trigger a custom event so the sidebar updates instantly
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 4, maxWidth: "800px", margin: "0 auto" }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
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
                width: 100,
                height: 100,
                fontSize: 40,
                mb: 2,
                bgcolor: "#2563eb"
              }}
            >
              {initial}
            </Avatar>

            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1f2937" }}>
              {name}
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: "16px", mt: 0.5 }}>
              {email}
            </Typography>

            <Chip
              label="System Administrator"
              color="primary"
              sx={{ mt: 2, fontWeight: 600 }}
            />
          </Box>

          <div className="dashboard-cards" style={{ marginTop: "30px", marginBottom: "0" }}>
            <div className="dashboard-card" style={{ cursor: "default", padding: "20px" }}>
              <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Employee ID</h4>
              <h1 style={{ fontSize: "18px", marginTop: "8px", marginBottom: "0" }}>ADM-001</h1>
            </div>

            <div className="dashboard-card" style={{ cursor: "default", padding: "20px" }}>
              <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Department</h4>
              <h1 style={{ fontSize: "18px", marginTop: "8px", marginBottom: "0" }}>IT & Security</h1>
            </div>

            <div className="dashboard-card" style={{ cursor: "default", padding: "20px" }}>
              <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Access Level</h4>
              <h1 style={{ fontSize: "18px", marginTop: "8px", marginBottom: "0" }}>Full System Access</h1>
            </div>
          </div>

          <div className="dashboard-cards" style={{ marginTop: "20px", display: "flex" }}>
            <div className="dashboard-card" style={{ cursor: "default", padding: "20px", flex: "0 1 calc(33.333% - 14px)", minWidth: "220px" }}>
              <h4 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Last Login</h4>
              <h1 style={{ fontSize: "18px", marginTop: "8px", marginBottom: "0" }}>{new Date().toLocaleString()}</h1>
            </div>
          </div>

          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setOpenEdit(true)}
              sx={{ px: 4, py: 1.5, borderRadius: 2, textTransform: "none", fontSize: "15px", fontWeight: 600, boxShadow: "0 4px 6px rgba(37,99,235,0.2)" }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>
      </Box>

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
    </AdminLayout>
  );
}
