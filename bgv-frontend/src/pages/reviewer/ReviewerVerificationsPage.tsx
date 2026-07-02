import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import {
  useSnackbar,
} from "notistack";

import {
  getVerifications,
  approveVerification,
  rejectVerification,
  reReviewVerification,
} from "../../services/ReviewerService";

import type {
  Verification,
} from "../../types/Verification";

export default function ReviewerVerificationsPage() {

  const navigate = useNavigate();

  const {
  enqueueSnackbar,
} = useSnackbar();

  const [verifications, setVerifications] =
    useState<Verification[]>([]);

  const [remarks, setRemarks] =
    useState<Record<number, string>>({});

  const loadVerifications =
    async () => {

      try {

        const result =
          await getVerifications();

        setVerifications(result);

      }
      catch (error) {

        console.error(error);

      }
    };

  useEffect(() => {

    void loadVerifications();

  }, []);

  const handleApprove =
    async (id: number) => {

      const remark =
        remarks[id];

      if (!remark?.trim()) {

        alert("Remarks required");

        return;
      }

      try {

        await approveVerification(
          id,
          remark
        );

        enqueueSnackbar(
  "Verification Approved",
  {
    variant: "success",
  }
);

        await loadVerifications();

      }
      catch {

        enqueueSnackbar(
  "Approval Failed",
  {
    variant: "error",
  }
);

      }
    };

  const handleReject =
    async (id: number) => {

      const remark =
        remarks[id];

      if (!remark?.trim()) {

        alert("Remarks required");

        return;
      }

      try {

        await rejectVerification(
          id,
          remark
        );

        enqueueSnackbar(
  "Verification Rejected",
  {
    variant: "warning",
  }
);

        await loadVerifications();

      }
      catch {

        enqueueSnackbar(
  "Rejection Failed",
  {
    variant: "error",
  }
);

      }
    };

    const handleReReview =
  async (id: number) => {

    try {

      await reReviewVerification(id);

      enqueueSnackbar(
        "Verification moved back to Pending",
        {
          variant: "info",
        }
      );

      await loadVerifications();

    }
    catch {

      enqueueSnackbar(
        "Re-Review Failed",
        {
          variant: "error",
        }
      );

    }

  };

  const getColor =
    (status: string) => {

      switch (status) {

        case "Approved":
          return "success";

        case "Rejected":
          return "error";

        default:
          return "warning";
      }
    };

  return (

    <Paper sx={{ p: 4 }}>

      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Verifications
      </Typography>

      <TableContainer
  sx={{
    overflowX: "auto",
  }}
>
       <Table
  sx={{
    minWidth: 1200,
  }}
>

          <TableHead>

            <TableRow>

              <TableCell>
                Verification ID
              </TableCell>

              <TableCell>
                Candidate ID
              </TableCell>

              <TableCell>
                Type
              </TableCell>

              <TableCell>
                Status
              </TableCell>

              <TableCell>
                Existing Remarks
              </TableCell>

              <TableCell>
                New Remarks
              </TableCell>

              <TableCell>
                Actions
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {verifications.map((v) => (

              <TableRow key={v.id}>

                <TableCell>
                  {v.id}
                </TableCell>

                <TableCell>
                  {v.candidateId}
                </TableCell>

                <TableCell>
                  {v.verificationType}
                </TableCell>

                <TableCell>

                  <Chip
                    label={v.status}
                    color={
                      getColor(v.status) as any
                    }
                  />

                </TableCell>

                <TableCell>
                  {v.reviewerRemarks}
                </TableCell>

                <TableCell>

                 <TextField
  size="small"
  sx={{
    width: 180,
  }}
                    placeholder="Enter remarks"
                    value={
                      remarks[v.id] || ""
                    }
                    onChange={(e) =>
                      setRemarks({
                        ...remarks,
                        [v.id]:
                          e.target.value,
                      })
                    }
                  />

                </TableCell>

                <TableCell>

                  <Stack
  direction="row"
  spacing={1}
  sx={{
    minWidth: 220,
  }}
>

<Stack
    direction="row"
    spacing={1}
></Stack>

<Button
    variant="outlined"
    onClick={() =>
        navigate(
            `/reviewer/verifications/${v.id}`
        )
    }
>
    View
</Button>


                    <Stack
  direction="row"
  spacing={1}
>

  {v.status === "Pending" && (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() =>
          handleApprove(v.id)
        }
      >
        Approve
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() =>
          handleReject(v.id)
        }
      >
        Reject
      </Button>
    </>
  )}

  {v.status === "Rejected" && (
    <Button
      variant="contained"
      color="warning"
      onClick={() =>
        handleReReview(v.id)
      }
    >
      Re-Review
    </Button>
  )}

</Stack>

                  </Stack>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );
}