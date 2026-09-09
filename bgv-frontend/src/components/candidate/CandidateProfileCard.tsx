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
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        mb: { xs: 1.5, sm: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: { xs: 1.5, sm: 2.5 },
        }}
      >
        <Avatar
          sx={{
            width: { xs: 52, sm: 72 },
            height: { xs: 52, sm: 72 },
            bgcolor: "var(--sidebar-bg)",
            fontSize: { xs: 22, sm: 30 },
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
            mt: 0.5,
          }}
        >
          {fullName.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justify: "space-between",
              flexWrap: "wrap",
              gap: 1,
              mb: 0.5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", sm: "1.4rem" },
              }}
            >
              {fullName}
            </Typography>

            <Chip
              label={status}
              color={getStatusColor()}
              size="small"
              sx={{
                fontWeight: 600,
                px: 1,
                height: 26,
                fontSize: "0.78rem",
              }}
            />
          </Box>

          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {email}
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
            {phoneNumber}
          </Typography>

          <Typography
            sx={{ mt: 0.5, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
          >
            Applied Role : <strong>{appliedRole}</strong>
          </Typography>
        </Box>
      </Box>
    </Paper>

  );

}