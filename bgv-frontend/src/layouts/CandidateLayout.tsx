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
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

const drawerWidth = 290;

export default function CandidateLayout() {

  const navigate = useNavigate();

  const location = useLocation();

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
        bgcolor: "#F4F7FB",
        minHeight: "100vh",
      }}
    >

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {

            width: drawerWidth,

            background: "#0F5D4B",

            color: "#fff",

            border: "none",

            display: "flex",

            flexDirection: "column",

            justifyContent: "space-between",

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
              borderColor: "rgba(255,255,255,.15)",
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

                    bgcolor: "#156B58",

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
              borderColor: "rgba(255,255,255,.15)",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 3,
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
    variant="contained"
    color="error"
    startIcon={<LogoutIcon />}
    onClick={handleLogout}
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

            bgcolor: "#fff",

            color: "#222",

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

            <IconButton>

              <SearchIcon />

            </IconButton>

            <IconButton>

              <NotificationsNoneIcon />

            </IconButton>

            <Avatar
              sx={{
                ml: 2,
                bgcolor: "#0F5D4B",
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

    </Box>

  );

}