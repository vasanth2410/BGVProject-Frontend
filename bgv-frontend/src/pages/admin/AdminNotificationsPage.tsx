import { useEffect, useState } from "react";
import { getAllNotifications } from "../../services/AdminNotificationService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  IconButton,
  Box,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getAllNotifications();
        setNotifications(result);
      } catch (error) {
        console.error(error);
      }
    };
    void loadData();
  }, []);

  return (
    <>
      <div style={{ padding: "30px" }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5, display: "flex", alignItems: "center" }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                mr: 1.5,
                animation: "ringBell 2.5s infinite ease-in-out",
                transformOrigin: "top center",
                "@keyframes ringBell": {
                  "0%": { transform: "rotate(0deg)" },
                  "10%": { transform: "rotate(15deg)" },
                  "20%": { transform: "rotate(-12deg)" },
                  "30%": { transform: "rotate(10deg)" },
                  "40%": { transform: "rotate(-6deg)" },
                  "50%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(0deg)" }
                }
              }}
            >
              🔔
            </Box>
            System Email Notifications (Test Mode Active)
          </Typography>
          <Typography color="text.secondary" variant="body2">
            All candidate welcome emails, document resubmission alerts, and BGV status updates are automatically logged and previewable here.
          </Typography>
        </Box>

        <div className="table-container">
          <table className="candidate-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipient Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date / Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {notifications.map((n) => (
                <tr key={n.id}>
                  <td>{n.id}</td>
                  <td><strong>{n.toEmail}</strong></td>
                  <td>{n.subject}</td>
                  <td>
                    <Chip
                      label={n.status || "Sent"}
                      color="success"
                      size="small"
                      variant="filled"
                    />
                  </td>
                  <td>{new Date(n.createdAt).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => setSelectedNotification(n)}
                      sx={{ textTransform: "none", borderRadius: "6px", backgroundColor: "#2563eb" }}
                    >
                      Preview Email
                    </Button>
                  </td>
                </tr>
              ))}
              {notifications.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>
                    No notifications recorded yet. Add a new candidate to see automated email alerts!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* HTML Email Preview Modal */}
      <Dialog
        open={Boolean(selectedNotification)}
        onClose={() => setSelectedNotification(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              overflow: "hidden"
            }
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "#1e293b", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {selectedNotification?.subject}
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              To: {selectedNotification?.toEmail}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setSelectedNotification(null)}
            sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff" } }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ padding: "0" }}>
          <iframe
            title="Email Preview"
            srcDoc={selectedNotification?.body || "<p style='padding:20px'>No Email Body Available</p>"}
            style={{
              width: "100%",
              height: "450px",
              border: "none"
            }}
          />
        </DialogContent>

        <DialogActions sx={{ padding: "16px", backgroundColor: "action.hover" }}>
          <Button
            onClick={() => setSelectedNotification(null)}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Close Preview
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}