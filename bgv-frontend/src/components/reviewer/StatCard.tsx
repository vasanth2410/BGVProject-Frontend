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
        borderRadius: 3,
        border: "1px solid",
        borderColor: "rgba(128, 128, 128, 0.2)",
        transition: "0.25s",
        height: "100%",
        bgcolor: "background.paper",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          transform: onClick ? "translateY(-4px)" : "none",
          boxShadow: onClick ? "0 8px 25px rgba(0,0,0,.15)" : "none",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,
          "&:last-child": { pb: 2 },
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            bgcolor: `${color}15`,
            color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
            "& svg": {
              fontSize: 24,
              color: "inherit !important",
            },
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            my: 0.5,
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
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