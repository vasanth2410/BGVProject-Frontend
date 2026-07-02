import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  Button,
  Stack,
} from "@mui/material";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getCandidateById,
  deleteCandidate
}
from "../../services/CandidateManagementService";



export default function CandidateDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [candidate, setCandidate] =
    useState<any>(null);

   


 useEffect(() => {

  const loadCandidate = async () => {

    const result =
      await getCandidateById(
        Number(id)
      );

    setCandidate(result);

  };

  void loadCandidate();

}, [id]);

  if (!candidate)
    return (
      <AdminLayout>
        <Typography sx={{ p: 4 }}>
          Loading...
        </Typography>
      </AdminLayout>
    );

  const handleDelete =
    async () => {
      if (
        !window.confirm(
          "Delete Candidate?"
        )
      )
        return;

      await deleteCandidate(
        candidate.id
      );

      alert(
        "Candidate Deleted Successfully"
      );

      navigate(
        "/admin/candidates"
      );
    };

  return (
    <AdminLayout>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          m: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Candidate Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Name :</strong>{" "}
              {candidate.fullName}
            </Typography>

            <Typography>
              <strong>Email :</strong>{" "}
              {candidate.email}
            </Typography>

            <Typography>
              <strong>Phone :</strong>{" "}
              {candidate.phoneNumber}
            </Typography>

            <Typography>
              <strong>Gender :</strong>{" "}
              {candidate.gender}
            </Typography>

            <Typography>
              <strong>Date of Birth :</strong>{" "}
              {candidate.dateOfBirth}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography>
              <strong>Address :</strong>{" "}
              {candidate.address}
            </Typography>

            <Typography>
              <strong>PAN :</strong>{" "}
              {candidate.panNumber}
            </Typography>

            <Typography>
              <strong>Aadhaar :</strong>{" "}
              {candidate.aadhaarNumber}
            </Typography>

            <Typography>
              <strong>Applied Role :</strong>{" "}
              {candidate.appliedRole}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Typography>
                <strong>Status :</strong>
              </Typography>

              <Chip
                label={candidate.status}
                color={
                  candidate.status ===
                  "Approved"
                    ? "success"
                    : candidate.status ===
                      "Rejected"
                    ? "error"
                    : "warning"
                }
              />
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
          }}
        />

        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                `/admin/candidates/edit/${candidate.id}`
              )
            }
          >
            Edit Candidate
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={
              handleDelete
            }
          >
            Delete Candidate
          </Button>
        </Stack>
      </Paper>
    </AdminLayout>
  );
}