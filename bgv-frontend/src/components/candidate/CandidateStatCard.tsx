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
        p: 2,
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        {icon}

        <Typography
          sx={{
            color: "#94a3b8",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 700,
          color,
          my: 0.5,
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          color: "#94a3b8",
          fontSize: 12,
          mt: 0.5,
        }}
      >
        {subtitle}
      </Typography>
    </Paper>
  );
}