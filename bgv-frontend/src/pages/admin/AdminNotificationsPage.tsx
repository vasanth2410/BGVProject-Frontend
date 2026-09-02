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
      <div className="page-container">
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "flex-start",
              fontSize: { xs: "1.35rem", sm: "2rem" },
              lineHeight: 1.3,
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                mr: 1.5,
                mt: 0.2,
                flexShrink: 0,
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
            <Box component="span">
              System Email Notifications (Test Mode Active)
            </Box>
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
              {notifications.map((n, index) => (
                <tr key={n.id}>
                  <td>{index + 1}</td>
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
            srcDoc={
              selectedNotification?.body && selectedNotification.body.trim().length > 0
                ? selectedNotification.body
                : `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="utf-8"/>
                    <style>
                      body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff; color: #1e293b; margin: 0; padding: 24px; }
                      .email-card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); }
                      .email-header { border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
                      .brand-title { color: #2563eb; font-size: 18px; font-weight: 700; margin: 0; }
                      .badge-tag { background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe; }
                      .email-subject { font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
                      .email-content { font-size: 14px; color: #334155; line-height: 1.6; }
                      .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; border-radius: 8px; padding: 14px 16px; margin: 20px 0; }
                      .info-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
                      .info-value { font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 2px; margin-bottom: 8px; }
                      .email-footer { border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 28px; font-size: 12px; color: #94a3b8; text-align: center; }
                    </style>
                  </head>
                  <body>
                    <div class="email-card">
                      <div class="email-header">
                        <h3 class="brand-title">🛡️ BGV Verification Platform</h3>
                        <span class="badge-tag">OFFICIAL ALERT</span>
                      </div>
                      <h4 class="email-subject">${selectedNotification?.subject || "System Notification"}</h4>
                      <div class="email-content">
                        <p>Hello,</p>
                        <p>This is an automated background verification update regarding: <strong>${selectedNotification?.subject || "Candidate Update"}</strong>.</p>
                      </div>
                      <div class="info-box">
                        <div class="info-label">RECIPIENT EMAIL</div>
                        <div class="info-value">${selectedNotification?.toEmail || "N/A"}</div>
                        <div class="info-label">DELIVERY STATUS</div>
                        <div class="info-value" style="color:#16a34a;">✔ ${selectedNotification?.status || "Sent"}</div>
                      </div>
                      <div class="email-content">
                        <p>Candidate background check logs, verification evidence, and compliance status have been updated in the BGV core system database.</p>
                      </div>
                      <div class="email-footer">
                        © ${new Date().getFullYear()} BGV System Verification Platform. All rights reserved.
                      </div>
                    </div>
                  </body>
                  </html>
                `
            }
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