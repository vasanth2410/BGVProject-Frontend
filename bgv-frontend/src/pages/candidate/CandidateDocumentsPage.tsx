import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CandidateDocumentsTable from "../../components/candidate/CandidateDocumentsTable";
import { OcrResultCard } from "../../components/verification/OcrResultCard";
import {
  getCandidateDocuments,
  downloadCandidateDocument,
  uploadDocument,
} from "../../services/CandidatePortalService";
import { scanDocumentOcr } from "../../services/VerificationEngineService";
import type { CandidateDocument } from "../../types/CandidatePortal";
import type { OcrResult } from "../../types/VerificationEngine";

export default function CandidateDocumentsPage() {
  const [documents, setDocuments] = useState<CandidateDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [latestOcr, setLatestOcr] = useState<OcrResult | null>(null);

  const loadDocuments = async () => {
    try {
      const result = await getCandidateDocuments();
      setDocuments(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDownload = async (id: number) => {
    try {
      await downloadCandidateDocument(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const [uploadMessage, setUploadMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadMessage(null);

    try {
      await uploadDocument(selectedFile);
      setUploadMessage({ text: "Document uploaded successfully!", type: "success" });
      setSelectedFile(null);

      const updatedDocs = await getCandidateDocuments();
      setDocuments(updatedDocs);

      // Perform OCR scan simulation safely on newly uploaded document
      if (updatedDocs.length > 0) {
        const newlyUploaded = updatedDocs[updatedDocs.length - 1];
        try {
          const ocrData = await scanDocumentOcr(newlyUploaded.id);
          setLatestOcr(ocrData);
        } catch (ocrErr) {
          console.warn("OCR Notice:", ocrErr);
        }
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      const data = error?.response?.data;
      let errMsg = "Upload failed. Please check backend connection.";
      if (typeof data === "string") {
        errMsg = data;
      } else if (data && typeof data === "object") {
        errMsg = data.message || data.title || (data.errors ? JSON.stringify(data.errors) : JSON.stringify(data));
      } else if (error?.message) {
        errMsg = error.message;
      }
      setUploadMessage({ text: errMsg, type: "error" });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <Typography sx={{ p: 4 }}>Loading Documents...</Typography>;
  }

  return (
    <Box sx={{ pb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        My Documents & Identity Reader
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 4,
          mb: 4,
          textAlign: "center",
          border: "2px dashed rgba(25, 118, 210, 0.3)",
          bgcolor: "background.paper",
        }}
      >
        <UploadFileIcon sx={{ fontSize: 70, color: "#1976d2", mb: 2 }} />

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          Upload Identity / Verification Document
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Upload PAN, Aadhaar, Passport, Police Clearance, or Educational Marksheets (PDF, JPG, PNG)
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
          <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
            Browse File
            <input hidden type="file" onChange={handleFileChange} />
          </Button>

          <Button
            variant="contained"
            disabled={!selectedFile || uploading}
            onClick={handleUpload}
            startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {uploading ? "Uploading & OCR Reading..." : "Upload & Scan Document"}
          </Button>
        </Box>

        {selectedFile && (
          <Typography sx={{ mt: 2, fontWeight: 600, color: "primary.main" }}>
            Selected File: {selectedFile.name}
          </Typography>
        )}

        {uploadMessage && (
          <Alert severity={uploadMessage.type} sx={{ mt: 2, maxWidth: 500, mx: "auto", borderRadius: 2 }}>
            {uploadMessage.text}
          </Alert>
        )}
      </Paper>

      {latestOcr && <OcrResultCard ocrData={latestOcr} />}

      <CandidateDocumentsTable data={documents} onDownload={handleDownload} />
    </Box>
  );
}