import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SearchIcon from "@mui/icons-material/Search";
import KeyIcon from "@mui/icons-material/Key";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MailIcon from "@mui/icons-material/Mail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ScienceIcon from "@mui/icons-material/Science";

import { getNotifications } from "../../services/NotificationService";
import type { Notification } from "../../types/Notification";

export default function ReviewerNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState<string>("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getNotifications();
        setNotifications(result);
      } catch (error) {
        console.error(error);
      }
    };

    void loadData();
  }, []);

  const getSubjectIcon = (subject: string) => {
    const subLower = (subject || "").toLowerCase();
    if (subLower.includes("credential") || subLower.includes("password") || subLower.includes("access")) {
      return <KeyIcon sx={{ fontSize: 16, color: "#60a5fa" }} />;
    }
    if (subLower.includes("welcome") || subLower.includes("portal")) {
      return <MarkEmailReadIcon sx={{ fontSize: 16, color: "#34d399" }} />;
    }
    return <MailIcon sx={{ fontSize: 16, color: "#c084fc" }} />;
  };

  const getStatusConfig = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "sent") {
      return {
        label: "Sent",
        icon: <CheckCircleIcon sx={{ fontSize: 13 }} />,
        bgcolor: "#dcfce7",
        color: "#15803d",
        borderColor: "1px solid #86efac",
        darkBgcolor: "rgba(34, 197, 94, 0.2)",
        darkColor: "#4ade80",
        darkBorderColor: "1px solid rgba(74, 222, 128, 0.4)",
      };
    }
    if (s.includes("simulat")) {
      return {
        label: "Sent (Simulated)",
        icon: <ScienceIcon sx={{ fontSize: 13 }} />,
        bgcolor: "#f3e8ff",
        color: "#6b21a8",
        borderColor: "1px solid #e9d5ff",
        darkBgcolor: "rgba(168, 85, 247, 0.2)",
        darkColor: "#c084fc",
        darkBorderColor: "1px solid rgba(192, 132, 252, 0.4)",
      };
    }
    if (s.includes("dead") || s.includes("error") || s.includes("fail")) {
      return {
        label: "DeadLetter",
        icon: <ErrorIcon sx={{ fontSize: 13 }} />,
        bgcolor: "#fee2e2",
        color: "#991b1b",
        borderColor: "1px solid #fca5a5",
        darkBgcolor: "rgba(239, 68, 68, 0.2)",
        darkColor: "#f87171",
        darkBorderColor: "1px solid rgba(248, 113, 113, 0.4)",
      };
    }
    return {
      label: status || "Pending",
      icon: <AccessTimeIcon sx={{ fontSize: 13 }} />,
      bgcolor: "#fef3c7",
      color: "#9a3412",
      borderColor: "1px solid #fde68a",
      darkBgcolor: "rgba(245, 158, 11, 0.2)",
      darkColor: "#fbbf24",
      darkBorderColor: "1px solid rgba(251, 191, 36, 0.4)",
    };
  };

  const filteredNotifications = notifications.filter((n) => {
    const keyword = search.trim().toLowerCase();
    const matchesSearch =
      !keyword ||
      (n.subject || "").toLowerCase().includes(keyword) ||
      (n.toEmail || "").toLowerCase().includes(keyword) ||
      (n.status || "").toLowerCase().includes(keyword) ||
      (n.id || "").toString().includes(keyword);

    const matchesStatus =
      statusTab === "All" ||
      (statusTab === "Sent" && n.status === "Sent") ||
      (statusTab === "Simulated" && (n.status || "").includes("Simulated")) ||
      (statusTab === "DeadLetter" && (n.status || "").includes("DeadLetter"));

    return matchesSearch && matchesStatus;
  });

  const sentCount = notifications.filter((n) => n.status === "Sent").length;
  const simulatedCount = notifications.filter((n) => (n.status || "").includes("Simulated")).length;
  const deadLetterCount = notifications.filter((n) => (n.status || "").includes("DeadLetter")).length;

  return (
    <Box sx={{ p: 1 }}>
      {/* Header Panel */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.15)",
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <NotificationsActiveIcon color="primary" sx={{ fontSize: 26 }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                System Email Audit Logs
              </Typography>
              <Chip
                label={`${notifications.length} Logs`}
                color="primary"
                size="small"
                sx={{ fontWeight: 700, borderRadius: 1.5 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Track real-time background SMTP email delivery, simulated triggers, and failed dead-letters.
            </Typography>
          </Box>
        </Box>

        {/* Status Filter Tabs & Search Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pt: 1,
            borderTop: "1px solid rgba(128, 128, 128, 0.1)",
          }}
        >
          <Tabs
            value={statusTab}
            onChange={(_, newValue) => setStatusTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: 40,
              maxWidth: "100%",
              "& .MuiTab-root": {
                minHeight: 40,
                fontWeight: 600,
                fontSize: 14,
                textTransform: "none",
                px: 2,
                color: "#94a3b8",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
                "&:hover": {
                  color: "#e2e8f0",
                },
                "&.Mui-selected": {
                  color: "#3b82f6",
                  fontWeight: 700,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#3b82f6",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab label={`All (${notifications.length})`} value="All" />
            <Tab label={`Sent (${sentCount})`} value="Sent" />
            <Tab label={`Simulated (${simulatedCount})`} value="Simulated" />
            <Tab label={`DeadLetter (${deadLetterCount})`} value="DeadLetter" />
          </Tabs>

          <TextField
            size="small"
            placeholder="Search subject or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: { xs: "100%", sm: 260 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />
        </Box>
      </Paper>

      {/* Glassmorphic Table Container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(128, 128, 128, 0.15)",
          overflowX: "auto",
          bgcolor: "background.paper",
          width: "100%",
          boxSizing: "border-box",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(128, 128, 128, 0.2)",
            borderRadius: 3,
          },
        }}
      >
        <Table sx={{ minWidth: { xs: 600, sm: 850 } }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "rgba(128, 128, 128, 0.05)" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Subject
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Created
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, pr: 3 }}>
                Sent Time
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredNotifications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                    No notification logs match your filter criteria.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredNotifications.map((n) => {
                const statusCfg = getStatusConfig(n.status);

                return (
                  <TableRow
                    key={n.id}
                    sx={{
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "rgba(128, 128, 128, 0.04)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                          sx={{
                            p: 0.75,
                            borderRadius: 1.5,
                            bgcolor: "rgba(128, 128, 128, 0.08)",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {getSubjectIcon(n.subject)}
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 14, color: "text.primary" }}>
                          {n.subject}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary", fontSize: 13.5, fontWeight: 500 }}>
                      {n.toEmail}
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={statusCfg.icon}
                        label={statusCfg.label}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: 11,
                          height: 24,
                          bgcolor: statusCfg.bgcolor,
                          color: statusCfg.color,
                          border: statusCfg.borderColor,
                          borderRadius: 1.5,
                          "& .MuiChip-icon": {
                            color: statusCfg.color,
                          },
                          "body.dark-mode &": {
                            bgcolor: statusCfg.darkBgcolor || statusCfg.bgcolor,
                            color: statusCfg.darkColor || statusCfg.color,
                            border: statusCfg.darkBorderColor || statusCfg.borderColor,
                            "& .MuiChip-icon": {
                              color: statusCfg.darkColor || statusCfg.color,
                            },
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: "text.secondary" }}>
                        <AccessTimeIcon sx={{ fontSize: 15, opacity: 0.7 }} />
                        <Typography variant="body2" sx={{ fontSize: 12.5, fontWeight: 500 }}>
                          {new Date(n.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ pr: 3 }}>
                      {n.sentAt ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            color: "#334155",
                            "body.dark-mode &": { color: "#cbd5e1" },
                          }}
                        >
                          <AccessTimeIcon
                            sx={{
                              fontSize: 15,
                              color: "#059669",
                              "body.dark-mode &": { color: "#34d399" },
                            }}
                          />
                          <Typography variant="body2" sx={{ fontSize: 12.5, fontWeight: 600 }}>
                            {new Date(n.sentAt).toLocaleString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </Typography>
                        </Box>
                      ) : (
                        <Chip
                          icon={<AccessTimeIcon sx={{ fontSize: 12 }} />}
                          label="Not Sent"
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: 10.5,
                            height: 22,
                            bgcolor: "rgba(148, 163, 184, 0.15)",
                            color: "#94a3b8",
                            border: "1px solid rgba(148, 163, 184, 0.25)",
                            borderRadius: 1.5,
                            "& .MuiChip-icon": {
                              color: "#94a3b8",
                            },
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}