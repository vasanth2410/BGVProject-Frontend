import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import DeleteDocumentDialog from "../../components/admin/DeleteDocumentDialog";

import {
  getAllDocuments,
  downloadDocument,
  deleteDocument,
} from "../../services/DocumentService";

import type { Document } from "../../types/Document";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  const [search, setSearch] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedDocumentId, setSelectedDocumentId] =
    useState<number | null>(null);

  const [selectedFileName, setSelectedFileName] =
    useState("");

  const loadDocuments = async () => {
    try {
      const result = await getAllDocuments();

      setDocuments(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void loadDocuments();
  }, []);

  const openDeleteDialog = (
    id: number,
    fileName: string
  ) => {
    setSelectedDocumentId(id);

    setSelectedFileName(fileName);

    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (selectedDocumentId == null) return;

    try {
      await deleteDocument(selectedDocumentId);

      setDocuments((previous) =>
        previous.filter(
          (doc) => doc.id !== selectedDocumentId
        )
      );

      alert("Document deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Unable to delete document.");
    }

    setDeleteOpen(false);

    setSelectedDocumentId(null);

    setSelectedFileName("");
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.fileName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doc.fileType
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doc.status
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      doc.candidateId
        .toString()
        .includes(search)
  );

  return (
    <>
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700 }}
          >
            Documents
          </Typography>

          <TextField
            label="Search"
            size="small"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>Candidate</TableCell>

                <TableCell>File Name</TableCell>

                <TableCell>Type</TableCell>

                <TableCell>Size</TableCell>

                <TableCell>Status</TableCell>

                <TableCell align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow
                  key={doc.id}
                  hover
                >
                  <TableCell>
                    {doc.id}
                  </TableCell>

                  <TableCell>
                    {doc.candidateId}
                  </TableCell>

                  <TableCell>
                    {doc.fileName}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={doc.fileType}
                      color="primary"
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {(doc.fileSize / 1024).toFixed(1)} KB
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={doc.status}
                      color={
                        doc.status === "Uploaded"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() =>
                        downloadDocument(doc.id)
                      }
                    >
                      DOWNLOAD
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() =>
                        openDeleteDialog(
                          doc.id,
                          doc.fileName
                        )
                      }
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <DeleteDocumentDialog
        open={deleteOpen}
        fileName={selectedFileName}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}