import {
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface Props {
  reviewerName: string;
}

export default function Topbar({
  reviewerName,
}: Props) {
  return (
    <Box
      sx={{
        height: 70,
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Breadcrumbs separator="›">
        <Link
          underline="hover"
          color="inherit"
          href="#"
        >
          Home
        </Link>

        <Typography color="text.primary">
          Reviewer Dashboard
        </Typography>
      </Breadcrumbs>

      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 2,
  }}
>
        <IconButton>
          <SearchIcon />
        </IconButton>

        <IconButton>
          <Badge
            color="error"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Avatar
          sx={{
            bgcolor: "#0f6e56",
            width: 40,
            height: 40,
            fontWeight: 700,
          }}
        >
          {reviewerName.substring(0, 2).toUpperCase()}
        </Avatar>
      </Box>
    </Box>
  );
}