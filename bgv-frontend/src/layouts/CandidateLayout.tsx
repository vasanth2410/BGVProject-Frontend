import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Avatar,
  Divider,
  Button,
  IconButton,
  Popover,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeToggle from "../components/DarkModeToggle";

import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { getCandidateProfile } from "../services/CandidatePortalService";
import { getSavedAvatar, clearAuthSession } from "../utils/avatarUtils";
import LogoutConfirmModal from "../components/LogoutConfirmModal";
import "../components/Sidebar.css";

const drawerWidth = 290;

export default function CandidateLayout() {

  const navigate = useNavigate();

  const location = useLocation();

  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<{ fullName: string; email: string } | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const data = await getCandidateProfile();
        if (data) {
          setProfile({ fullName: data.fullName, email: data.email });
          const savedAvatar = getSavedAvatar(data.id, data.fullName, data.email);
          if (savedAvatar) {
            setAvatarUrl(savedAvatar);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    void loadProfileData();
  }, [location.pathname]);

  const getInitials = (name: string) => {
    if (!name) return "C";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const mockNotifications = [
    { id: 1, text: "Background verification process started.", time: "2 hours ago" },
    { id: 2, text: "Documents received and under initial review.", time: "1 day ago" },
    { id: 3, text: "Welcome to the Background Verification Portal.", time: "2 days ago" },
  ];

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    clearAuthSession();
    navigate("/");
  };

  const menus = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/candidate",
    },
    {
      text: "Profile",
      icon: <PersonIcon />,
      path: "/candidate/profile",
    },
    {
  text: "My Documents",
  icon: <DescriptionIcon />,
  path: "/candidate/documents",
},
    {
      text: "Verification Status",
      icon: <VerifiedUserIcon />,
      path: "/candidate/verifications",
    },
  ];

  return (

    <Box
      sx={{
        display: "flex",
        bgcolor: "var(--background-bg)",
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {

            width: drawerWidth,

            background: "var(--sidebar-bg)",

            color: "#fff",

            border: "none",

            display: "flex",

            flexDirection: "column",

            justifyContent: "space-between",

            transition: "background-color 0.3s ease, color 0.3s ease",

          },

        }}
      >

        <Box>

          <Toolbar
            sx={{
              py: 3,
              px: 3,
              alignItems: "flex-start",
            }}
          >

            <Box>

              <Typography
  variant="h4"
  sx={{
    fontWeight: "bold",
  }}
>
                BGV System
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.85,
                }}
              >
                Candidate Portal
              </Typography>

            </Box>

          </Toolbar>

          <Divider
            sx={{
              borderColor: "var(--sidebar-divider)",
            }}
          />

          <List
            sx={{
              mt: 2,
              px: 2,
            }}
          >

            {menus.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <ListItemButton
                  key={menu.path}
                  className={`menu-link ${isActive ? "active" : ""}`}
                  selected={isActive}
                  onClick={() => navigate(menu.path)}
                  sx={{
                    position: "relative",
                    borderRadius: "12px",
                    mb: 1,
                    px: "18px",
                    py: "12px",
                    color: isActive ? "#ffffff" : "#cbd5e1",
                    transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&.Mui-selected": {
                      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%) !important",
                      color: "#ffffff !important",
                      boxShadow: "0 6px 20px rgba(37, 99, 235, 0.45)",
                      fontWeight: 600,
                      transform: "translateX(4px)",
                    },
                    "&.Mui-selected::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "15%",
                      height: "70%",
                      width: "4px",
                      background: "#00F0FF",
                      borderRadius: "0 4px 4px 0",
                      boxShadow: "0 0 10px #00F0FF, 0 0 20px #00F0FF",
                      animation: "activeIndicatorPulse 2s infinite ease-in-out",
                    },
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                      transform: "translateX(6px)",
                    },
                    "&:hover .menu-icon, &:hover svg": {
                      transform: "scale(1.18) rotate(5deg)",
                      color: "#00F0FF !important",
                    },
                  }}
                >
                  <ListItemIcon
                    className="menu-icon"
                    sx={{
                      color: isActive ? "#ffffff" : "#cbd5e1",
                      minWidth: 38,
                      transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>

                  <ListItemText>
                    <Typography
                      sx={{
                        fontSize: "14.5px",
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#ffffff" : "#cbd5e1",
                      }}
                    >
                      {menu.text}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              );
            })}

          </List>

        </Box>

        <Box>

          <Divider
            sx={{
              borderColor: "var(--sidebar-divider)",
            }}
          />

          <Box
            onClick={() => navigate("/candidate/profile")}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              cursor: "pointer",
              transition: "background-color 0.25s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >

            <Avatar
              src={avatarUrl || undefined}
              sx={{
                bgcolor: "#2F66E8",
                mr: 1.5,
                fontWeight: 700,
                width: 34,
                height: 34,
                fontSize: 13,
              }}
            >
              {!avatarUrl && (profile?.fullName ? getInitials(profile.fullName) : "C")}
            </Avatar>

            <Box sx={{ overflow: "hidden" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
                }}
              >
                {profile?.fullName || "Candidate"}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  fontSize: 11,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 170,
                }}
              >
                {profile?.email || "candidate@test.com"}
              </Typography>
            </Box>

          </Box>

          <Box
            sx={{
              p: 1.5,
            }}
          >

            <Button
              fullWidth
              variant="text"
              startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
              onClick={handleLogoutClick}
              sx={{
                color: "#fff",
                justifyContent: "flex-start",
                borderRadius: 3,
                px: 2,
                py: 0.8,
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.12)",
                  transform: "translateX(3px)",
                },
              }}
            >
              Logout
            </Button>

          </Box>

        </Box>

      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
        }}
      >

        <AppBar

          position="static"

          elevation={1}

          sx={{

            bgcolor: "var(--appbar-bg)",

            color: "var(--appbar-text)",

            transition: "background-color 0.3s ease, color 0.3s ease",

          }}

        >

          <Toolbar>

            <Typography
              sx={{
                flexGrow: 1,
                fontWeight: 600,
              }}
            >
              Home • Dashboard
            </Typography>

            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <DarkModeToggle />
            </Box>

            <IconButton onClick={() => setSearchOpen(true)}>

              <SearchIcon />

            </IconButton>

            <IconButton onClick={handleNotificationOpen}>

              <NotificationsNoneIcon />

            </IconButton>

            <Avatar
              src={avatarUrl || undefined}
              onClick={() => navigate("/candidate/profile")}
              sx={{
                ml: 2,
                bgcolor: "var(--sidebar-bg)",
                fontWeight: 700,
                transition: "background-color 0.3s ease, transform 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {!avatarUrl && (profile?.fullName ? getInitials(profile.fullName) : "C")}
            </Avatar>

          </Toolbar>

        </AppBar>

        <Box
          sx={{
            p: 4,
          }}
        >

          <Outlet />

        </Box>

      </Box>

      {/* Notifications Popover */}
      <Popover
        open={Boolean(notificationAnchor)}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              p: 2.5,
              width: 320,
              borderRadius: 3,
              mt: 1.5,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }
          }
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, fontSize: "16px" }}>
          Notifications
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        {mockNotifications.map((notif) => (
          <Box key={notif.id} sx={{ mb: 1.5, "&:last-child": { mb: 0 } }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
              {notif.text}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
              {notif.time}
            </Typography>
          </Box>
        ))}
      </Popover>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Search Portal
          </Typography>
          <TextField
            fullWidth
            autoFocus
            label="Type to search..."
            placeholder="Search documents or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Try searching for "Degree", "Resume", or "Approved".
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setSearchOpen(false)} color="inherit">
            Close
          </Button>
          <Button onClick={() => {
            setSearchOpen(false);
            navigate("/candidate/documents");
          }} variant="contained">
            Search Documents
          </Button>
        </DialogActions>
      </Dialog>

      <LogoutConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </Box>

  );

}