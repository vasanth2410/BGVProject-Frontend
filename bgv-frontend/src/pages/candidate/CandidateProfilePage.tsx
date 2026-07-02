import {
  useEffect,
  useState,
} from "react";

import {
  Paper,
  Typography,
  Grid,
  TextField,
} from "@mui/material";

import {
  getCandidateProfile,
} from "../../services/CandidatePortalService";

import type {
  CandidateProfile,
} from "../../types/CandidateProfile";

export default function CandidateProfilePage() {

  const [profile,
    setProfile] =
      useState<CandidateProfile | null>(null);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile =
    async () => {

      try {

        const result =
          await getCandidateProfile();

        setProfile(result);

      }

      catch (error) {

        console.error(error);

      }

    };

  if (!profile) {

    return <Typography>

      Loading...

    </Typography>;

  }

  return (

    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
        }}
      >
        My Profile
      </Typography>

      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Full Name"
            value={profile.fullName}
            slotProps={{
  input: {
    readOnly: true,
  },
}}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Email"
            value={profile.email}
            slotProps={{
  input: {
    readOnly: true,
  },
}}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Phone Number"
            value={profile.phoneNumber}
            slotProps={{
  input: {
    readOnly: true,
  },
}}
          />

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Applied Role"
            value={profile.appliedRole}
            slotProps={{
  input: {
    readOnly: true,
  },
}}
          />

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            label="Status"
            value={profile.status}
           slotProps={{
  input: {
    readOnly: true,
  },
}}
          />

        </Grid>

      </Grid>

    </Paper>

  );

}