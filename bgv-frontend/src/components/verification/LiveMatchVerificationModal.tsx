import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Alert,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import GavelIcon from "@mui/icons-material/Gavel";
import BadgeIcon from "@mui/icons-material/Badge";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { runLiveVerification, scanDocumentOcr } from "../../services/VerificationEngineService";
import { getDocumentsByCandidateId } from "../../services/DocumentService";
import { OcrResultCard } from "./OcrResultCard";
import type { LiveVerificationResult, OcrResult } from "../../types/VerificationEngine";

interface LiveMatchVerificationModalProps {
  open: boolean;
  onClose: () => void;
  candidateId: number;
  candidateName: string;
}

export const LiveMatchVerificationModal: React.FC<LiveMatchVerificationModalProps> = ({
  open,
  onClose,
  candidateId,
  candidateName,
}) => {
  const [loading, setLoading] = useState(false);
  const [stepMessage, setStepMessage] = useState("");
  const [result, setResult] = useState<LiveVerificationResult | null>(null);
  const [ocrResults, setOcrResults] = useState<OcrResult[]>([]);
  const [ocrNotice, setOcrNotice] = useState<string>("");

  const handleStartVerification = async () => {
    setLoading(true);
    setResult(null);
    setOcrResults([]);
    setOcrNotice("");

    try {
      // Step 1: Retrieve Candidate Documents and execute Tesseract OCR
      setStepMessage("📂 Fetching candidate uploaded documents...");
      const candidateDocs = await getDocumentsByCandidateId(candidateId);

      if (candidateDocs && candidateDocs.length > 0) {
        setStepMessage(`📄 Running Tesseract OCR on ${candidateDocs.length} uploaded document(s)...`);
        const scannedResults: OcrResult[] = [];

        for (const doc of candidateDocs) {
          try {
            const ocrData = await scanDocumentOcr(doc.id);
            if (ocrData) {
              scannedResults.push(ocrData);
            }
          } catch (ocrErr) {
            console.error(`OCR scan error for document ID #${doc.id}:`, ocrErr);
          }
        }

        if (scannedResults.length > 0) {
          setOcrResults(scannedResults);
        } else {
          setOcrNotice("Document OCR scan attempted, but no text could be extracted.");
        }
      } else {
        setOcrNotice("No uploaded document found for this candidate. OCR scan skipped.");
      }

      // Step 2: Third-Party Database Gateway Queries
      setStepMessage("🏦 Querying NSDL Govt PAN Database Gateway...");
      await new Promise((r) => setTimeout(r, 600));

      setStepMessage("🆔 Querying UIDAI Aadhaar Vault & Demographic Match...");
      await new Promise((r) => setTimeout(r, 600));

      setStepMessage("⚖️ Searching CCTNS Police Records & National Judicial Data Grid...");
      await new Promise((r) => setTimeout(r, 600));

      // Step 3: Run Live Third-Party Verification Engine
      const data = await runLiveVerification(candidateId);
      setResult(data);
    } catch (error) {
      console.error("Live verification engine error:", error);
    } finally {
      setLoading(false);
      setStepMessage("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <VerifiedIcon color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Live Third-Party Match Verification Engine
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Candidate: {candidateName} (ID: #{candidateId})
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ minHeight: 380, py: 3 }}>
        {!result && !loading && (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <VerifiedIcon sx={{ fontSize: 80, color: "primary.main", mb: 2, opacity: 0.8 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Simulate Live Third-Party Verification
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 500, mx: "auto", mb: 4 }}>
              Click below to initiate automated live matching across Govt Income Tax PAN (NSDL), UIDAI Aadhaar Vault,
              and CCTNS National Police & Court Records.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartVerification}
              sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 700 }}
            >
              Run Live Matching Engine
            </Button>
          </Box>
        )}

        {loading && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress size={64} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Executing Live Verification Engine...
            </Typography>
            <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
              {stepMessage}
            </Typography>
          </Box>
        )}

        {result && !loading && (
          <Box>
            {/* Overall Header Banner */}
            <Alert
              icon={result.overallStatus === "Verified" ? <CheckCircleIcon fontSize="inherit" /> : <WarningAmberIcon fontSize="inherit" />}
              severity={result.overallStatus === "Verified" ? "success" : "warning"}
              sx={{ mb: 3, borderRadius: 3, "& .MuiAlert-message": { width: "100%" } }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Overall Live Status: {result.overallStatus.toUpperCase()}
                  </Typography>
                  <Typography variant="caption">
                    Aggregated Match Confidence: {result.overallConfidenceScore}% | Timestamp: {new Date(result.verifiedAt).toLocaleString()}
                  </Typography>
                </Box>
                <Chip
                  label={`${result.overallConfidenceScore}% Match`}
                  color={result.overallStatus === "Verified" ? "success" : "warning"}
                  sx={{ fontWeight: 700 }}
                />
              </Box>
            </Alert>

            {/* Real Tesseract OCR Extraction Results Section */}
            {ocrResults.length > 0 ? (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "primary.main" }}>
                  📄 Real Tesseract OCR Extracted Document Details ({ocrResults.length})
                </Typography>
                {ocrResults.map((ocrItem, idx) => (
                  <OcrResultCard key={ocrItem.documentId || idx} ocrData={ocrItem} />
                ))}
              </Box>
            ) : ocrNotice ? (
              <Alert severity="info" sx={{ mb: 3, borderRadius: 3 }}>
                {ocrNotice}
              </Alert>
            ) : null}

            {/* Grid of Third-Party Gateway Results */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "text.primary" }}>
              🌐 Govt Gateway & Judicial Verification Results
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* 1. PAN Check Card */}
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: result.panCheck.status === "Verified" ? "success.main" : "warning.main" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BadgeIcon color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      PAN Gateway Match (NSDL)
                    </Typography>
                  </Box>
                  <Chip
                    label={result.panCheck.status}
                    color={result.panCheck.status === "Verified" ? "success" : "warning"}
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    PAN No: <b>{result.panCheck.panNumber}</b>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Matched Name: <b>{result.panCheck.matchedName}</b>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Score: <b>{result.panCheck.nameMatchScore}%</b>
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 1 }}>
                  Source: {result.panCheck.issuedBy}
                </Typography>
              </Paper>

              {/* 2. Aadhaar Check Card */}
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: result.aadhaarCheck.status === "Verified" ? "success.main" : "warning.main" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FingerprintIcon color="secondary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Aadhaar Demographic Vault (UIDAI)
                    </Typography>
                  </Box>
                  <Chip
                    label={result.aadhaarCheck.status}
                    color={result.aadhaarCheck.status === "Verified" ? "success" : "warning"}
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Aadhaar Ref: <b>{result.aadhaarCheck.maskedAadhaar}</b>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Name Score: <b>{result.aadhaarCheck.nameMatchScore}%</b>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Address: <b>{result.aadhaarCheck.addressMatched ? "Matched" : "Mismatch"}</b>
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.disabled" sx={{ display: "block", mt: 1 }}>
                  Source: {result.aadhaarCheck.issuedBy}
                </Typography>
              </Paper>

              {/* 3. Criminal Check Card */}
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, borderColor: result.criminalCheck.status === "Clean" ? "success.main" : "error.main" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <GavelIcon color={result.criminalCheck.status === "Clean" ? "success" : "error"} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Criminal & Judicial Records Search (CCTNS)
                    </Typography>
                  </Box>
                  <Chip
                    label={result.criminalCheck.status}
                    color={result.criminalCheck.status === "Clean" ? "success" : "error"}
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: result.criminalCheck.status === "Clean" ? "success.dark" : "error.dark", mb: 1 }}>
                  {result.criminalCheck.summary}
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: "block" }}>
                  Database Searched: {result.criminalCheck.databaseSearched}
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        {result && (
          <Button onClick={handleStartVerification} variant="outlined" disabled={loading}>
            Re-Run Matching Engine
          </Button>
        )}
        <Button onClick={onClose} variant="contained" color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
