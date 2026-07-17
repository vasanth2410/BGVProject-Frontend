import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  getReviewerCandidate,
  getReviewerCandidateDocuments,
  getReviewerCandidateVerifications,
  approveVerification,
  rejectVerification,
  reReviewVerification,
  createVerification,
} from "../../services/ReviewerService";

import {
  getDocumentUrl,
} from "../../services/DocumentService";

import type {
  Verification,
} from "../../types/Verification";

interface Candidate {

  id: number;

  fullName: string;

  email: string;

  phoneNumber: string;

  status: string;

}

interface CandidateDocument {

  id: number;

  fileName: string;

  fileType: string;

  status: string;

}

export default function ReviewerCandidateReviewPage() {

  const { id } = useParams();

  const [candidate, setCandidate] =
    useState<Candidate | null>(null);

  const [documents, setDocuments] =
    useState<CandidateDocument[]>([]);

  const [verifications, setVerifications] =
    useState<Verification[]>([]);

 const [remarks, setRemarks] =
  useState<Record<number, string>>({});

  const [openSnackbar, setOpenSnackbar] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

    const [dialogOpen, setDialogOpen] =
  useState(false);

const [selectedVerificationId, setSelectedVerificationId] =
  useState<number | null>(null);

const [dialogAction, setDialogAction] =
  useState<"approve" | "reject" | "rereview">("approve");

  const loadData = async () => {

    if (!id) return;

    try {

      const candidateResult =
        await getReviewerCandidate(
          Number(id)
        );

      setCandidate(
        candidateResult
      );

      const documentResult =
        await getReviewerCandidateDocuments(
          Number(id)
        );

      setDocuments(
        documentResult
      );

      const verificationResult =
        await getReviewerCandidateVerifications(
          Number(id)
        );

      const filterUnique = (list: any[]) => {
        const seen = new Set();
        return list.filter((item) => {
          const duplicate = seen.has(item.verificationType);
          seen.add(item.verificationType);
          return !duplicate;
        });
      };

      if (verificationResult.length === 0 && documentResult.length > 0) {
        // Automatically create a verification task for each uploaded document
        for (const doc of documentResult) {
          try {
            await createVerification(Number(id), doc.fileName);
          } catch (e) {
            console.error("Error auto-creating verification:", e);
          }
        }
        
        // Re-fetch verifications
        const freshVerifications = await getReviewerCandidateVerifications(Number(id));
        setVerifications(filterUnique(freshVerifications));
      } else {
        setVerifications(
          filterUnique(verificationResult)
        );
      }

    }
    catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    void loadData();

  }, [id]);

  const showMessage = (

    message: string

  ) => {

    setSnackbarMessage(message);

    setOpenSnackbar(true);

  };

  const openConfirmation = (

  verificationId: number,

  action: "approve" | "reject" | "rereview"

) => {

  if (action !== "rereview") {

    const remark =
      remarks[verificationId] ?? "";

    if (!remark.trim()) {

      showMessage(
        "Please enter reviewer remarks."
      );

      return;

    }

  }

  setSelectedVerificationId(
    verificationId
  );

  setDialogAction(action);

  setDialogOpen(true);

};

  const handleApprove = async (

    verificationId: number

  ) => {

    const remark =
  remarks[verificationId] ?? "";

if (!remark.trim()) {

  showMessage(
    "Please enter remarks."
  );

  return;
}

    try {

      await approveVerification(
    verificationId,
    remark
);

      setRemarks((previous) => ({

    ...previous,

    [verificationId]: ""

}));

      showMessage(
        "Verification Approved Successfully"
      );

      await loadData();

    }

    catch {

      showMessage(
        "Approval Failed"
      );

    }

  };

 const handleReject = async (

  verificationId: number

) => {

  const remark =
    remarks[verificationId] ?? "";

  if (!remark.trim()) {

    showMessage(
      "Please enter remarks."
    );

    return;

  }

  try {

    await rejectVerification(

      verificationId,

      remark

    );

    setRemarks((previous) => ({

      ...previous,

      [verificationId]: ""

    }));

    showMessage(
      "Verification Rejected Successfully"
    );

    await loadData();

  }

  catch {

    showMessage(
      "Rejection Failed"
    );

  }

};

  const handleReReview =
  async (
    verificationId: number
  ) => {

   
    try {

      await reReviewVerification(
        verificationId
      );

      showMessage(
        "Verification moved back to Pending."
      );

      await loadData();

    }
    catch {

      showMessage(
        "Failed to reopen verification."
      );

    }

  };

  const getStatusColor = (

    status: string

  ) => {

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
    <Box sx={{ p: 3 }}>

  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      mb: 3,
    }}
  >
    Review Candidate
  </Typography>

  {candidate && (

    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        mb: 4,
      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Candidate Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}
        >

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <Stack
    direction="row"
    spacing={2}
    sx={{
        alignItems: "center"
    }}
>

              <PersonIcon color="primary" />

              <Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Full Name
                </Typography>

                <Typography
    sx={{
        fontWeight:700
    }}
>
                  {candidate.fullName}
                </Typography>

              </Box>

            </Stack>

          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <Stack
    direction="row"
    spacing={2}
    sx={{
        alignItems: "center"
    }}
>

              <EmailIcon color="primary" />

              <Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Email
                </Typography>

                <Typography
    sx={{
        fontWeight:700
    }}
>
                  {candidate.email}
                </Typography>

              </Box>

            </Stack>

          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <Stack
    direction="row"
    spacing={2}
    sx={{
        alignItems: "center"
    }}
>

              <PhoneIcon color="primary" />

              <Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Phone
                </Typography>

                <Typography
    sx={{
        fontWeight:700
    }}
>
                  {candidate.phoneNumber}
                </Typography>

              </Box>

            </Stack>

          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <Stack
    direction="row"
    spacing={2}
    sx={{
        alignItems: "center"
    }}
>

              <BadgeIcon color="primary" />

              <Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Status
                </Typography>

                <Chip
                  label={candidate.status}
                  color={
                    getStatusColor(
                      candidate.status
                    ) as any
                  }
                />

              </Box>

            </Stack>

          </Grid>

        </Grid>

      </CardContent>

    </Card>

  )}

  <Paper
    elevation={0}
    sx={{
      borderRadius: 3,
      border: "1px solid #e5e7eb",
      mb: 4,
      overflow: "hidden",
    }}
  >

    <Box
      sx={{
        p: 3,
      }}
    >

      <Typography
    sx={{
        fontWeight:700
    }}
>
        Candidate Documents
      </Typography>

    </Box>

    <Divider />

    <TableContainer>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              File Name
            </TableCell>

            <TableCell>
              Type
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell align="center">
              Action
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {documents.map((document) => (

            <TableRow
              key={document.id}
              hover
            >

              <TableCell>
                {document.fileName}
              </TableCell>

              <TableCell>
                {document.fileType}
              </TableCell>

              <TableCell>

                <Chip
                  label={document.status}
                  color="success"
                  size="small"
                />

              </TableCell>

              <TableCell align="center">

                <Button
                  variant="outlined"
                  startIcon={<VisibilityIcon />}
                  href={getDocumentUrl(document.id)}
                  target="_blank"
                >
                  View
                </Button>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  </Paper>

  <Paper
  elevation={0}
  sx={{
    borderRadius: 3,
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  }}
>

  <Box sx={{ p: 3 }}>

    <Typography
    sx={{
        fontWeight:700
    }}
>
      Verifications
    </Typography>

  

    {verifications.map(
      (verification) => (

        <Card
          key={verification.id}
          elevation={0}
          sx={{
            mb: 3,
            border: "1px solid #e5e7eb",
            borderRadius: 3,
          }}
        >

          <CardContent>

            <Stack
    direction="row"
    spacing={2}
    sx={{
        alignItems: "center"
    }}
>

              <Typography
    sx={{
        fontWeight:700
    }}
>
                {verification.verificationType}
              </Typography>

              <Chip
                label={
                  verification.status
                }
                color={
                  getStatusColor(
                    verification.status
                  ) as any
                }
              />

            </Stack>

            <Divider
              sx={{
                mb: 2,
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Previous Remarks
            </Typography>

            <Typography
              sx={{
                mb: 3,
              }}
            >
              {
                verification.reviewerRemarks ||
                "No Remarks"
              }
            </Typography>

            <TextField
  fullWidth
  multiline
  rows={3}
  label="New Remarks"
  placeholder="Enter reviewer remarks..."
  value={
    remarks[verification.id] ?? ""
  }
  onChange={(e) =>
    setRemarks((previous) => ({

      ...previous,

      [verification.id]:
        e.target.value

    }))
  }
  sx={{
    mb: 3,
  }}
/>

            <Stack
              direction="row"
              spacing={2}
            >

              {verification.status === "Pending" && (
    <>
        <Button
            variant="contained"
            color="success"
            onClick={() =>
  openConfirmation(
    verification.id,
    "approve"
  )
}
        >
            Approve
        </Button>

        <Button
            variant="contained"
            color="error"
           onClick={() =>
  openConfirmation(
    verification.id,
    "reject"
  )
}
        >
            Reject
        </Button>
    </>
)}

{verification.status !== "Pending" && (
    <Button
        variant="outlined"
        color="warning"
       onClick={() =>
  openConfirmation(
    verification.id,
    "rereview"
  )
}
    >
        Re-Review
    </Button>
)}

            </Stack>

          </CardContent>

        </Card>

      )
    )}

  </Box>

</Paper>

<Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() =>
    setOpenSnackbar(false)
  }
>

  <Alert
    severity="success"
    variant="filled"
    onClose={() =>
      setOpenSnackbar(false)
    }
  >
    {snackbarMessage}
  </Alert>

</Snackbar>
<Dialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
>
  <DialogTitle>
    Confirmation
  </DialogTitle>

  <DialogContent>

    <DialogContentText>

      {dialogAction === "approve" &&
        "Approve this verification?"}

      {dialogAction === "reject" &&
        "Reject this verification?"}

      {dialogAction === "rereview" &&
        "Move this verification back to Pending?"}

    </DialogContentText>

  </DialogContent>

  <DialogActions>

    <Button
      onClick={() =>
        setDialogOpen(false)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={async () => {

        if (
          selectedVerificationId == null
        ) return;

        setDialogOpen(false);

        if (
          dialogAction === "approve"
        ) {

          await handleApprove(
            selectedVerificationId
          );

        }
        else if (
          dialogAction === "reject"
        ) {

          await handleReject(
            selectedVerificationId
          );

        }
        else {

          await handleReReview(
            selectedVerificationId
          );

        }

      }}
    >
      Confirm
    </Button>

  </DialogActions>

  

</Dialog>
</Box>

);
}