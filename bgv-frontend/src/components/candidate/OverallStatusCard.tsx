import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

interface Props {
  status: string;
}

export default function OverallStatusCard({
  status,
}: Props) {

  const color =
    status === "Completed"
      ? "success"
      : status === "Rejected"
      ? "error"
      : "warning";

  return (

    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >

      <CardContent>

        <Typography
          variant="h6"
          gutterBottom
        >
          Overall Verification Status
        </Typography>

        <Chip
          label={status}
          color={color}
          sx={{
            mt: 2,
          }}
        />

      </CardContent>

    </Card>

  );

}