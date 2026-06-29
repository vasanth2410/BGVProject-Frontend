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
}

export default function StatCard({
  title,
  value,
  note,
  icon,
  color,
}: Props) {

  return (

    <Card
      elevation={0}
      sx={{

        borderRadius: 4,

        border: "1px solid #e5e7eb",

        transition: "0.25s",

        height: "100%",

        background: "#ffffff",

        "&:hover": {

          transform: "translateY(-6px)",

          boxShadow:
            "0 12px 35px rgba(0,0,0,.12)",

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

            color: "#111827",

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