import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { changeUserPassword } from "../../services/AuthService";

interface ChangePasswordModalProps {
  open: boolean;
  email: string;
  onSuccess: () => void;
}

export default function ChangePasswordModal({
  open,
  email,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setErrorMsg("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      await changeUserPassword(email, currentPassword, newPassword);
      setSuccessMsg("Password changed successfully! Redirecting...");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to change password.";
      setErrorMsg(typeof msg === "string" ? msg : "Password change failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
          },
        },
        paper: {
          sx: {
            borderRadius: "24px",
            p: 3,
            background: "var(--card-bg, #1e293b)",
            color: "var(--text-color, #ffffff)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 158, 11, 0.2)",
            overflow: "hidden",
            position: "relative",
          },
        },
      }}
    >
      {/* Top Subtle Warning Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "100px",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(245,158,11,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            p: 0,
            pt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Badge */}
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)",
              color: "#fbbf24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              border: "1px solid rgba(251, 191, 36, 0.35)",
              boxShadow: "0 8px 24px rgba(245, 158, 11, 0.25)",
            }}
          >
            <LockResetIcon sx={{ fontSize: "30px" }} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: "1.25rem",
              mb: 0.5,
              color: "var(--text-color, #ffffff)",
            }}
          >
            Password Change Required
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.82,
              fontSize: "0.88rem",
              textAlign: "center",
              mb: 2.5,
              color: "var(--text-color, #cbd5e1)",
            }}
          >
            This is your first login with temporary credentials. Please set a new secure password to proceed to your dashboard.
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert severity="success" sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
              {successMsg}
            </Alert>
          )}

          <TextField
            label="Current / Temporary Password"
            type="password"
            variant="outlined"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter temporary password"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                borderRadius: "12px",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(251, 191, 36, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#fbbf24" },
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fbbf24" },
            }}
          />

          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            required
            placeholder="Enter new password"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                borderRadius: "12px",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(251, 191, 36, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#fbbf24" },
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fbbf24" },
            }}
          />

          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
            placeholder="Confirm new password"
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                borderRadius: "12px",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(251, 191, 36, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#fbbf24" },
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#fbbf24" },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 0,
            pt: 2.5,
            pb: 0,
            display: "flex",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{
              borderRadius: "12px",
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
              },
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Update Password & Continue"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
