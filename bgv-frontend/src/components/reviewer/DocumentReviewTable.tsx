import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

import type {
  ChipProps,
} from "@mui/material";

interface DocumentItem {
  id: number;
  candidateName: string;
  documentType: string;
  fileName: string;
  uploadedOn: string;
  status: string;
}

interface Props {
  documents: DocumentItem[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function DocumentReviewTable({
  documents,
  onApprove,
  onReject,
}: Props) {
  const getColor = (
    status: string
  ): ChipProps["color"] => {
    switch (status) {
      case "Approved":
        return "success";

      case "Rejected":
        return "error";

      case "Pending":
        return "warning";

      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        Pending Document Reviews
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Uploaded On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  {doc.candidateName}
                </TableCell>

                <TableCell>
                  {doc.documentType}
                </TableCell>

                <TableCell>
                  {doc.fileName}
                </TableCell>

                <TableCell>
                  {doc.uploadedOn}
                </TableCell>

                <TableCell>
                  <Chip
                    label={doc.status}
                    color={getColor(doc.status)}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  {doc.status === "Pending" ? (
                    <>
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        sx={{ mr: 1 }}
                        onClick={() =>
                          onApprove(doc.id)
                        }
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() =>
                          onReject(doc.id)
                        }
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                    >
                      View
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}