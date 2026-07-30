import {
  Box,
  Chip,
  LinearProgress,
  Typography,
  Paper,
} from "@mui/material";

interface Props {
  name: string;
  completed: number;
  total: number;
}

export default function ProgressCard({
  name,
  completed,
  total,
}: Props) {
  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const getColor = () => {
    if (percentage >= 100) return "success";
    if (percentage >= 70) return "primary";
    if (percentage >= 40) return "warning";
    return "error";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        mb: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "rgba(128, 128, 128, 0.15)",
        transition: ".2s",
        bgcolor: "background.paper",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 0.75,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 13.5,
          }}
        >
          {name}
        </Typography>

        <Chip
          label={`${percentage}%`}
          color={getColor()}
          size="small"
          sx={{ height: 20, fontSize: 11, fontWeight: 700 }}
        />
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        color={getColor()}
        sx={{
          height: 6,
          borderRadius: 4,
          mb: 0.75,
        }}
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: 11.5 }}
      >
        {completed} of {total} verification(s) completed
      </Typography>
    </Paper>
  );
}