import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
  Paper,
} from "@mui/material";

import type {
  ChipProps,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useNavigate } from "react-router-dom";
import { getSavedAvatar } from "../../utils/avatarUtils";

interface Props {
  candidateId: number;
  name: string;
  email: string;
  status: string;
}

export default function CandidateRow({
  candidateId,
  name,
  email,
  status,
}: Props) {
  const navigate = useNavigate();

  const getColor = (): ChipProps["color"] => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "In Progress":
        return "info";
      default:
        return "warning";
    }
  };

  const savedAvatar = getSavedAvatar(candidateId, name, email);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 1.5, sm: 2 },
        p: 2,
        mb: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "rgba(128, 128, 128, 0.2)",
        transition: "all 0.25s ease-in-out",
        bgcolor: "background.paper",
        boxSizing: "border-box",
        width: "100%",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 8px 22px rgba(0,0,0,.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Left (Avatar + Candidate Details) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          minWidth: 0,
          flex: 1,
        }}
      >
        <Avatar
          src={savedAvatar || undefined}
          sx={{
            bgcolor: "#0b5d4b",
            width: 48,
            height: 48,
            fontWeight: 700,
            fontSize: 17,
            flexShrink: 0,
          }}
        >
          {!savedAvatar && name.substring(0, 2).toUpperCase()}
        </Avatar>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 15,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: 13,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {email}
          </Typography>
        </Box>
      </Box>

      {/* Right (Status Chip + Review Button) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "space-between", sm: "flex-end" },
          gap: 1.5,
          flexShrink: 0,
          width: { xs: "100%", sm: "auto" },
          pt: { xs: 1, sm: 0 },
          borderTop: { xs: "1px solid rgba(128, 128, 128, 0.12)", sm: "none" },
        }}
      >
        <Chip
          label={status}
          color={getColor()}
          size="small"
          sx={{
            fontWeight: 600,
            fontSize: 12,
            height: 26,
            px: 0.5,
          }}
        />

        <Button
          variant="contained"
          startIcon={<VisibilityIcon sx={{ fontSize: 18 }} />}
          endIcon={<ChevronRightIcon sx={{ fontSize: 18 }} />}
          onClick={() => navigate(`/reviewer/review/${candidateId}`)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
            px: 2,
            py: 0.75,
            fontSize: 13.5,
            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
            },
          }}
        >
          Review
        </Button>
      </Box>
    </Paper>
  );
}