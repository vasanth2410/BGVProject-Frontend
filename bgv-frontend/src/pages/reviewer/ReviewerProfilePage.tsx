import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import EditIcon
from "@mui/icons-material/Edit";

export default function ReviewerProfilePage() {

  const reviewer = {

    name: "Reviewer User",

    email: "reviewer@test.com",

    role: "Reviewer",

    employeeId: "EMP-1004",

    department:
      "Background Verification",

    assignedCases: 15,

    completedReviews: 10,

    pendingReviews: 5,

    lastLogin:
      new Date().toLocaleString(),

  };

  return (

    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 600,
        mx: "auto",
        mt: 2,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)"
      }}
    >

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >

        <Avatar
          sx={{
            width: 90,
            height: 90,
            fontSize: 32,
            mb: 2,
          }}
        >
          RU
        </Avatar>

        <Typography
  variant="h5"
  sx={{
    fontWeight: 700,
  }}
>
          {reviewer.name}
        </Typography>

        <Typography
          color="text.secondary"
        >
          {reviewer.email}
        </Typography>

        <Chip
          label={reviewer.role}
          color="primary"
          sx={{ mt: 2 }}
        />

      </Box>

      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
  sx={{
    fontWeight: 700,
  }}
>
            Employee ID
          </Typography>

          <Typography>
            {reviewer.employeeId}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
  sx={{
    fontWeight: 700,
  }}
>
            Department
          </Typography>

          <Typography>
            {reviewer.department}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
  sx={{
    fontWeight: 700,
  }}
>
            Assigned Cases
          </Typography>

          <Typography>
            {reviewer.assignedCases}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
  sx={{
    fontWeight: 700,
  }}
>
            Completed Reviews
          </Typography>

          <Typography>
            {reviewer.completedReviews}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
  sx={{
    fontWeight: 700,
  }}
>
            Pending Reviews
          </Typography>

          <Typography>
            {reviewer.pendingReviews}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
  sx={{
    fontWeight: 700,
  }}
>
            Last Login
          </Typography>

          <Typography>
            {reviewer.lastLogin}
          </Typography>

        </Grid>

      </Grid>

      <Box
        sx={{
          mt: 4,
          textAlign: "center",
        }}
      >

        <Button
          variant="contained"
          startIcon={<EditIcon />}
        >
          Edit Profile
        </Button>

      </Box>

    </Paper>

  );

}