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
      : Math.round(
          (completed / total) * 100
        );

  const getColor = () => {

    if (percentage >= 100)
      return "success";

    if (percentage >= 70)
      return "primary";

    if (percentage >= 40)
      return "warning";

    return "error";

  };

  return (

    <Paper
      elevation={0}
      sx={{

        p: 2,

        mb: 2,

        borderRadius: 3,

        border: "1px solid",

        borderColor: "rgba(128, 128, 128, 0.2)",

        transition: ".25s",

        bgcolor: "background.paper",

        "&:hover": {

          boxShadow:
            "0 8px 20px rgba(0,0,0,.08)",

          transform:
            "translateY(-2px)",

        },

      }}
    >

      <Box
        sx={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          mb: 1,

        }}
      >

        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          {name}
        </Typography>

        <Chip

          label={`${percentage}%`}

          color={getColor()}

          size="small"

        />

      </Box>

      <LinearProgress

        variant="determinate"

        value={percentage}

        color={getColor()}

        sx={{

          height: 10,

          borderRadius: 10,

          mb: 1,

        }}

      />

      <Typography

        variant="body2"

        color="text.secondary"

      >

        {completed} of {total} verification(s) completed

      </Typography>

    </Paper>

  );

}