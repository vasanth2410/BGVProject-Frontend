import React, { useState } from "react";
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

const drawerWidth = 290;

export default function CandidateLayout() {

  const navigate = useNavigate();

  const location = useLocation();

  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleLogout = () => {

  localStorage.clear();

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

            {menus.map((menu) => (

              <ListItemButton

                key={menu.path}

                selected={
                  location.pathname === menu.path
                }

                onClick={() =>
                  navigate(menu.path)
                }

                sx={{

                  borderRadius: 3,

                  mb: 1,

                  color: "#fff",

                  "&.Mui-selected": {

                    bgcolor: "#2F66E8",

                    color: "#fff",

                  },

                  "&.Mui-selected:hover": {

                    bgcolor: "#2F66E8",

                  },

                  "&:hover": {

                    bgcolor: "#3B82F6",

                  },

                }}

              >

                <ListItemIcon
                  sx={{
                    color: "#fff",
                    minWidth: 40,
                  }}
                >
                  {menu.icon}
                </ListItemIcon>

                <ListItemText
                  primary={menu.text}
                />

              </ListItemButton>

            ))}

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
              p: 3,
              cursor: "pointer",
              transition: "background-color 0.25s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >

            <Avatar
              sx={{
                bgcolor: "#2F66E8",
                mr: 2,
              }}
            >
              C
            </Avatar>

            <Box>

             <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                Candidate
              </Typography>

              <Typography
                variant="body2"
                sx={{ opacity: 0.8 }}
              >
                candidate@test.com
              </Typography>

            </Box>

          </Box>

          <Box
            sx={{
              p: 2,
            }}
          >

            <Button
              fullWidth
              variant="text"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                color: "#fff",
                justifyContent: "flex-start",
                borderRadius: 3,
                px: 2.5,
                py: 1.5,
                textTransform: "none",
                fontSize: "15px",
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
              onClick={() => navigate("/candidate/profile")}
              sx={{
                ml: 2,
                bgcolor: "var(--sidebar-bg)",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              C
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
        PaperProps={{
          sx: {
            p: 2.5,
            width: 320,
            borderRadius: 3,
            mt: 1.5,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
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
    </Box>

  );

}