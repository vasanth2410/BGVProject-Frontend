import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";

import type {
  ChipProps,
} from "@mui/material";

import VisibilityIcon
from "@mui/icons-material/Visibility";

import ChevronRightIcon
from "@mui/icons-material/ChevronRight";

import { useNavigate }
from "react-router-dom";

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

  const navigate =
    useNavigate();

  const getColor =
    (): ChipProps["color"] => {

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

  return (

    <Box

      sx={{

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        p: 2,

        mb: 2,

        borderRadius: 3,

        border: "1px solid #ececec",

        transition: ".25s",

        bgcolor: "#fff",

        "&:hover": {

          boxShadow:
            "0 8px 22px rgba(0,0,0,.08)",

          transform:
            "translateY(-2px)",

        },

      }}

    >

      {/* Left */}

      <Box

        sx={{

          display: "flex",

          alignItems: "center",

          gap: 2,

        }}

      >

        <Avatar

          sx={{

            bgcolor: "#0b5d4b",

            width: 52,

            height: 52,

            fontWeight: 700,

            fontSize: 18,

          }}

        >

          {name
            .substring(0, 2)
            .toUpperCase()}

        </Avatar>

        <Box>

          <Typography

            sx={{

              fontWeight: 700,

              fontSize: 16,

            }}

          >

            {name}

          </Typography>

          <Typography

            variant="body2"

            color="text.secondary"

          >

            {email}

          </Typography>

        </Box>

      </Box>

      {/* Right */}

      <Box

        sx={{

          display: "flex",

          alignItems: "center",

          gap: 2,

        }}

      >

        <Chip

          label={status}

          color={getColor()}

          size="small"

        />

        <Button

          variant="contained"

          startIcon={<VisibilityIcon />}

          endIcon={<ChevronRightIcon />}

          onClick={() =>

            navigate(

              `/reviewer/review/${candidateId}`

            )

          }

          sx={{

            borderRadius: 2,

            textTransform: "none",

            fontWeight: 600,

          }}

        >

          Review

        </Button>

      </Box>

    </Box>

  );

}