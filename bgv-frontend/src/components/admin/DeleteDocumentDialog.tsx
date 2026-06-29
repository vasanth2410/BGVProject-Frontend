import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  fileName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDocumentDialog({
  open,
  fileName,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete Document
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          <br />
          <strong>{fileName}</strong> ?
        </DialogContentText>
      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>
    </Dialog>
  );
}