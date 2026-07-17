import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  note: string;
  icon: ReactNode;
  color: string;
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  note,
  icon,
  color,
  onClick,
}: Props) {

  return (

    <Card
      elevation={0}
      onClick={onClick}
      sx={{

        borderRadius: 4,

        border: "1px solid",

        borderColor: "rgba(128, 128, 128, 0.2)",

        transition: "0.25s",

        height: "100%",

        bgcolor: "background.paper",

        cursor: onClick ? "pointer" : "default",

        "&:hover": {

          transform: onClick ? "translateY(-6px)" : "none",

          boxShadow:
            onClick ? "0 12px 35px rgba(0,0,0,.12)" : "none",

        },

      }}
    >

      <CardContent
        sx={{
          p: 3,
        }}
      >

        <Box
          sx={{

            width: 58,

            height: 58,

            borderRadius: 3,

            bgcolor: `${color}15`,

            color,

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            mb: 3,

            "& svg": {

              fontSize: 32,

              color: "inherit !important",

            },

          }}
        >

          {icon}

        </Box>

        <Typography
          sx={{

            color: "#64748b",

            fontSize: 15,

            fontWeight: 600,

          }}
        >

          {title}

        </Typography>

        <Typography
          sx={{

            fontSize: 42,

            fontWeight: 700,

            mt: 1,

            mb: 1,

          }}
        >

          {value}

        </Typography>

        <Typography
          sx={{

            fontSize: 14,

            fontWeight: 600,

            color,

          }}
        >

          {note}

        </Typography>

      </CardContent>

    </Card>

  );

}