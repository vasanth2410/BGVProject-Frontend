import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

interface Props {

  open: boolean;

  onClose: () => void;

  verification: any | null;

}

export default function VerificationDetailsDialog({

  open,

  onClose,

  verification,

}: Props) {

  if (!verification)
    return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>

        Verification Details

      </DialogTitle>

      <Divider />

      <DialogContent>

        <Stack spacing={2}>

          <Typography>

            <strong>ID :</strong>{" "}

            {verification.id}

          </Typography>

          <Typography>

            <strong>Candidate ID :</strong>{" "}

            {verification.candidateId}

          </Typography>

          <Typography>

            <strong>Verification :</strong>{" "}

            {verification.verificationType}

          </Typography>

          <Typography>

            <strong>Status :</strong>{" "}

            {verification.status}

          </Typography>

          <Typography>

            <strong>Reviewer Remarks :</strong>{" "}

            {verification.reviewerRemarks || "-"}

          </Typography>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >

          Close

        </Button>

      </DialogActions>

    </Dialog>

  );

}