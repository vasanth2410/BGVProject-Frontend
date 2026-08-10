import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface LogoutConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({
  open,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.15)",
            overflow: "hidden",
            position: "relative",
          },
        },
      }}
    >
      {/* Top Subtle Red Background Glow */}
      <Box
        sx={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "100px",
          background: "radial-gradient(circle, rgba(239,68,68,0.25) 0%, rgba(239,68,68,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <DialogContent
        sx={{
          p: 0,
          pt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Glowing Logout Badge */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "20px",
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.3) 100%)",
            color: "#f87171",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2.5,
            border: "1px solid rgba(239, 68, 68, 0.35)",
            boxShadow: "0 8px 24px rgba(239, 68, 68, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
          }}
        >
          <LogoutIcon sx={{ fontSize: "32px" }} />
        </Box>

        {/* Modal Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            fontSize: "1.35rem",
            mb: 1,
            letterSpacing: "-0.02em",
            color: "var(--text-color, #ffffff)",
          }}
        >
          Logging Out?
        </Typography>

        {/* Modal Description */}
        <Typography
          variant="body2"
          sx={{
            opacity: 0.78,
            fontSize: "0.92rem",
            lineHeight: 1.5,
            maxWidth: "280px",
            mb: 1,
            color: "var(--text-color, #cbd5e1)",
          }}
        >
          Are you sure you want to log out of your BGV System account?
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 0,
          pt: 3,
          pb: 0,
          display: "flex",
          gap: 1.5,
          width: "100%",
        }}
      >
        {/* Cancel Button */}
        <Button
          onClick={onClose}
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: "14px",
            py: 1.4,
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            borderColor: "rgba(255, 255, 255, 0.15)",
            color: "var(--text-color, #cbd5e1)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.3)",
              background: "rgba(255, 255, 255, 0.08)",
              transform: "translateY(-1px)",
            },
          }}
        >
          No, Stay
        </Button>

        {/* Yes Logout Button */}
        <Button
          onClick={onConfirm}
          fullWidth
          variant="contained"
          endIcon={<ArrowForwardIcon sx={{ fontSize: "18px !important" }} />}
          sx={{
            borderRadius: "14px",
            py: 1.4,
            fontWeight: 700,
            fontSize: "0.95rem",
            textTransform: "none",
            background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
            color: "#ffffff",
            boxShadow: "0 6px 20px rgba(239, 68, 68, 0.4)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)",
              boxShadow: "0 8px 25px rgba(239, 68, 68, 0.55)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Yes, Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
