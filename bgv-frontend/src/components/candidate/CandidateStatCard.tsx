import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

interface Props {

  title: string;

  value: number;

  subtitle: string;

  icon: React.ReactNode;

  color: string;

}

export default function CandidateStatCard({

  title,

  value,

  subtitle,

  icon,

  color,

}: Props) {

  return (

    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >

        {icon}

        <Typography
          sx={{
            color: "#777",
            fontSize: 14,
          }}
        >
          {title}
        </Typography>

      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          color: "#888",
          mt: 1,
        }}
      >
        {subtitle}
      </Typography>

    </Paper>

  );

}