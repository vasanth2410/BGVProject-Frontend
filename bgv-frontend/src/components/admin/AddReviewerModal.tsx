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
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  const [createdResult, setCreatedResult] = useState<{
    fullName: string;
    email: string;
    temporaryPassword?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please enter both Full Name and Email.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setCreatedResult(null);
      const res = await createReviewer(fullName.trim(), email.trim());

      const tempPass = typeof res === "object" ? res.temporaryPassword : "";
      setCreatedResult({
        fullName: fullName.trim(),
        email: email.trim(),
        temporaryPassword: tempPass,
      });

      setFullName("");
      setEmail("");
      if (onSuccess) {
        onSuccess();
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
      setCreatedResult(null);
      setCopied(false);
      onClose();
    }
  };

  const handleCopyPassword = () => {
    if (createdResult?.temporaryPassword) {
      navigator.clipboard.writeText(createdResult.temporaryPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            backgroundColor: "rgba(15, 23, 42, 0.75)",
          },
        },
        paper: {
          sx: {
            borderRadius: "24px",
            p: 3,
            background: "#1e293b",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.2)",
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

      {createdResult ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 1 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "18px",
              background: "rgba(34, 197, 94, 0.15)",
              color: "#4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              border: "1px solid rgba(34, 197, 94, 0.35)",
            }}
          >
            <CheckCircleIcon sx={{ fontSize: "32px" }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, color: "#ffffff" }}>
            Reviewer Account Created!
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.8, textAlign: "center", mb: 2, color: "#cbd5e1" }}>
            Reviewer credentials generated successfully.
          </Typography>

          {createdResult.temporaryPassword && (
            <Box
              sx={{
                width: "100%",
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: "14px",
                p: 2,
                mb: 2.5,
              }}
            >
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mb: 0.5 }}>
                Email: <strong style={{ color: "#ffffff" }}>{createdResult.email}</strong>
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mb: 1 }}>
                Temporary Password:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#0f172a",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 1,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <code style={{ fontFamily: "monospace", fontSize: "15px", color: "#38bdf8", fontWeight: 700 }}>
                  {createdResult.temporaryPassword}
                </code>
                <Tooltip title={copied ? "Copied!" : "Copy Password"}>
                  <IconButton size="small" onClick={handleCopyPassword} sx={{ color: "#38bdf8" }}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}

          <Button
            onClick={handleClose}
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "12px",
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              background: "linear-gradient(135deg, #2563eb 0%, #0284c7 100%)",
              color: "#ffffff !important",
            }}
          >
            Done
          </Button>
        </Box>
      ) : (
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
                color: "#ffffff !important",
              }}
            >
              Add New Reviewer
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.88rem",
                textAlign: "center",
                mb: 2.5,
                color: "#cbd5e1 !important",
              }}
            >
              Create a Reviewer account. An invitation with temporary login credentials will be emailed to them.
            </Typography>

            {errorMsg && (
              <Alert severity="error" sx={{ width: "100%", mb: 2, borderRadius: "10px" }}>
                {errorMsg}
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
                "& .MuiInputBase-input": {
                  color: "#ffffff !important",
                  WebkitTextFillColor: "#ffffff !important",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px #0f172a inset !important",
                  WebkitTextFillColor: "#ffffff !important",
                },
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  borderRadius: "12px",
                  backgroundColor: "#0f172a",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                  "&:hover fieldset": { borderColor: "#38bdf8" },
                  "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
                },
                "& .MuiInputLabel-root": {
                  color: "#cbd5e1 !important",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#38bdf8 !important",
                },
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  color: "#38bdf8 !important",
                  backgroundColor: "#1e293b",
                  px: 0.8,
                  borderRadius: "4px",
                },
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
                "& .MuiInputBase-input": {
                  color: "#ffffff !important",
                  WebkitTextFillColor: "#ffffff !important",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px #0f172a inset !important",
                  WebkitTextFillColor: "#ffffff !important",
                },
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  borderRadius: "12px",
                  backgroundColor: "#0f172a",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                  "&:hover fieldset": { borderColor: "#38bdf8" },
                  "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
                },
                "& .MuiInputLabel-root": {
                  color: "#cbd5e1 !important",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#38bdf8 !important",
                },
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  color: "#38bdf8 !important",
                  backgroundColor: "#1e293b",
                  px: 0.8,
                  borderRadius: "4px",
                },
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
                borderColor: "rgba(255, 255, 255, 0.3)",
                color: "#ffffff !important",
                "&:hover": {
                  borderColor: "#ffffff",
                  background: "rgba(255, 255, 255, 0.1)",
                },
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
                color: "#ffffff !important",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1d4ed8 0%, #0369a1 100%)",
                },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#ffffff" }} /> : "Create Reviewer"}
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
}
