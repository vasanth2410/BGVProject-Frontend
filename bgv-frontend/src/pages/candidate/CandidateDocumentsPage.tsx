import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import CandidateDocumentsTable
from "../../components/candidate/CandidateDocumentsTable";

import {
  getCandidateDocuments,
  downloadCandidateDocument,
  uploadDocument,
} from "../../services/CandidatePortalService";

import type {
  CandidateDocument,
} from "../../types/CandidatePortal";

export default function CandidateDocumentsPage() {

  const [documents, setDocuments] =
    useState<CandidateDocument[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedFile,
    setSelectedFile] =
    useState<File | null>(null);

  const loadDocuments =
    async () => {

      try {

        const result =
          await getCandidateDocuments();

        setDocuments(result);

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadDocuments();

  }, []);

  const handleDownload =
    async (id: number) => {

      try {

        await downloadCandidateDocument(id);

      }

      catch (error) {

        console.error(error);

      }

    };

  const handleFileChange =
    (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {

      if (
        event.target.files &&
        event.target.files.length > 0
      ) {

        setSelectedFile(
          event.target.files[0]
        );

      }

    };

  const handleUpload =
    async () => {

      if (!selectedFile)
        return;

      try {

        await uploadDocument(
          selectedFile
        );

        setSelectedFile(null);

        await loadDocuments();

      }

      catch (error) {

        console.error(error);

      }

    };

  if (loading) {

    return (
      <Typography>
        Loading Documents...
      </Typography>
    );

  }

  return (

    <Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 4,
        }}
      >
        My Documents
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          mb: 5,
          textAlign: "center",
        }}
      >

        <UploadFileIcon
          sx={{
            fontSize: 70,
            color: "#1976d2",
            mb: 2,
          }}
        />

        <Typography
          variant="h6"
          gutterBottom
        >
          Upload a Document
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mb: 3,
          }}
        >
          PDF, DOC, DOCX, JPG or PNG
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >

          <Button
            component="label"
            variant="outlined"
            startIcon={
              <UploadFileIcon />
            }
          >

            Browse File

            <input
              hidden
              type="file"
              onChange={
                handleFileChange
              }
            />

          </Button>

          <Button
            variant="contained"
            disabled={!selectedFile}
            onClick={
              handleUpload
            }
          >
            Upload
          </Button>

        </Box>

        {

          selectedFile && (

            <Typography
              sx={{
                mt: 3,
                fontWeight: 600,
              }}
            >

              Selected File

              <br />

              {selectedFile.name}

            </Typography>

          )

        }

      </Paper>

      <CandidateDocumentsTable
        data={documents}
        onDownload={
          handleDownload
        }
      />

    </Box>

  );

}