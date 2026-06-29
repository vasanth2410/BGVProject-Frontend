import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TableContainer,
} from "@mui/material";

import {
  getCandidateDocuments,
} from "../../services/ReviewerService";

import type {
  ReviewerDocument,
} from "../../types/ReviewerDocument";

export default function ReviewerDocumentsPage() {

  const [
    documents,
    setDocuments,
  ] = useState<
    ReviewerDocument[]
  >([]);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const result =
            await getCandidateDocuments(1);

          setDocuments(result);

        }
        catch (error) {

          console.error(error);

        }

      };

    void loadData();

  }, []);

  const getStatusColor =
    (status: string) => {

      switch (status) {

        case "Approved":
          return "success";

        case "Rejected":
          return "error";

        case "Pending":
          return "warning";

        default:
          return "primary";

      }

    };

  return (

    <Paper
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },

        borderRadius: 3,
      }}
    >

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Documents
      </Typography>

      {documents.length === 0 ? (

        <Typography
          color="text.secondary"
        >
          No documents found.
        </Typography>

      ) : (

        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >

          <Table
            sx={{
              minWidth: 900,
            }}
          >

            <TableHead>

              <TableRow>

                <TableCell>
                  File Name
                </TableCell>

                <TableCell>
                  Type
                </TableCell>

                <TableCell>
                  Size
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell>
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {documents.map(
                (document) => (

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
                      {document.fileSize}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={
                          document.status
                        }
                        color={
                          getStatusColor(
                            document.status
                          ) as any
                        }
                        size="small"
                      />

                    </TableCell>

                    <TableCell>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                        }}
                      >

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() =>
                            window.open(
                              `https://localhost:7006/api/Documents/download/${document.id}`,
                              "_blank"
                            )
                          }
                        >
                          View
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            window.location.href =
                              `https://localhost:7006/api/Documents/download/${document.id}`
                          }
                        >
                          Download
                        </Button>

                      </Box>

                    </TableCell>

                  </TableRow>

                )
              )}

            </TableBody>

          </Table>

        </TableContainer>

      )}

    </Paper>

  );

}