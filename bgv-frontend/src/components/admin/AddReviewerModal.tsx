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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { createReviewer } from "../../services/AssignmentService";

interface AddReviewerModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddReviewerModal({
  open,
  onClose,
  onSuccess,
}: AddReviewerModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please enter both Full Name and Email.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");
      const res = await createReviewer(fullName.trim(), email.trim());
      setSuccessMsg(res || "Reviewer account created and invitation sent!");
      setFullName("");
      setEmail("");
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create reviewer account.";
      setErrorMsg(typeof msg === "string" ? msg : "Creation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFullName("");
      setEmail("");
      setErrorMsg("");
      setSuccessMsg("");
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
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
            borderRadius: "24px",
            p: 3,
            background: "var(--card-bg, #1e293b)",
            color: "var(--text-color, #ffffff)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.15)",
            overflow: "hidden",
            position: "relative",
          },
        },
      }}
    >
      {/* Top Subtle Blue Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "100px",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(37,99,235,0) 70%)",
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
                "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(0, 240, 255, 0.2) 100%)",
              color: "#38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              border: "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.25)",
            }}
          >
            <PersonAddIcon sx={{ fontSize: "28px" }} />
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
            Add New Reviewer
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.78,
              fontSize: "0.88rem",
              textAlign: "center",
              mb: 2.5,
              color: "var(--text-color, #cbd5e1)",
            }}
          >
            Create a Reviewer account. An invitation with temporary login credentials will be emailed to them.
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
            label="Full Name"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                borderRadius: "12px",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#38bdf8" },
            }}
          />

          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                borderRadius: "12px",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                "&:hover fieldset": { borderColor: "rgba(56, 189, 248, 0.5)" },
                "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
              },
              "& .MuiInputLabel-root": { color: "#94a3b8" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#38bdf8" },
            }}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 0,
            pt: 2.5,
            pb: 0,
            display: "flex",
            gap: 1.5,
            width: "100%",
          }}
        >
          <Button
            onClick={handleClose}
            fullWidth
            disabled={loading}
            variant="outlined"
            sx={{
              borderRadius: "12px",
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "#cbd5e1",
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            variant="contained"
            sx={{
              borderRadius: "12px",
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(135deg, #2563eb 0%, #0284c7 100%)",
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(37, 99, 235, 0.4)",
            }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Create Reviewer"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
