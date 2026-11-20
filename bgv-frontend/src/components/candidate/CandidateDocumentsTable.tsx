import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import DownloadIcon
from "@mui/icons-material/Download";

import type {
  CandidateDocument,
} from "../../types/CandidatePortal";

import { formatToISTDate } from "../../utils/dateUtils";

interface Props {

  data: CandidateDocument[];

  onDownload: (id: number, fileName?: string) => void;

  downloadingId?: number | null;

}

export default function CandidateDocumentsTable({

  data,

  onDownload,

  downloadingId,

}: Props) {

  return (

    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflowX: "auto",
        width: "100%",
      }}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              <strong>File Name</strong>
            </TableCell>

            <TableCell>
              <strong>File Type</strong>
            </TableCell>

            <TableCell>
              <strong>Status</strong>
            </TableCell>

            <TableCell>
              <strong>Uploaded Date</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Action</strong>
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {data.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={5}
                align="center"
              >

                <Typography
                  color="text.secondary"
                >
                  No documents uploaded.
                </Typography>

              </TableCell>

            </TableRow>

          ) : (

            data.map((document) => (

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
                    color={
                      document.status === "Approved"
                        ? "success"
                        : document.status === "Rejected"
                        ? "error"
                        : "warning"
                    }
                  />

                </TableCell>

                <TableCell>

                  {formatToISTDate(document.uploadedDate)}

                </TableCell>

                <TableCell align="center">

                  <Button
                    variant="outlined"
                    disabled={downloadingId === document.id}
                    startIcon={
                      downloadingId === document.id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <DownloadIcon />
                      )
                    }
                    onClick={() =>
                      onDownload(
                        document.id,
                        document.fileName
                      )
                    }
                  >
                    {downloadingId === document.id ? "Downloading..." : "Download"}
                  </Button>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </Paper>

  );

}