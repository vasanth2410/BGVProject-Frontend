import {
  Avatar,
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";

interface Props {
  fullName: string;
  email: string;
  phoneNumber: string;
  appliedRole: string;
  status: string;
}

export default function CandidateProfileCard({
  fullName,
  email,
  phoneNumber,
  appliedRole,
  status,
}: Props) {

  const getStatusColor = () => {

    switch (status) {

      case "Approved":
      case "Completed":
        return "success";

      case "Rejected":
        return "error";

      default:
        return "warning";

    }

  };

  return (

    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: 4,
      }}
    >

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >

        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "var(--sidebar-bg)",
            fontSize: 32,
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
        >
          {fullName.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1 }}>

         <Typography
  variant="h5"
  sx={{
    fontWeight: "bold",
  }}
>
            {fullName}
          </Typography>

          <Typography color="text.secondary">
            {email}
          </Typography>

          <Typography color="text.secondary">
            {phoneNumber}
          </Typography>

          <Typography
            sx={{ mt: 1 }}
          >
            Applied Role :
            <strong> {appliedRole}</strong>
          </Typography>

        </Box>

        <Chip
          label={status}
          color={getStatusColor()}
          sx={{
            fontWeight: 600,
            px: 1,
          }}
        />

      </Box>

    </Paper>

  );

}