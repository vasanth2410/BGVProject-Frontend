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

  const isDark = document.body.classList.contains("dark-mode");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(15, 23, 42, 0.65)",
          },
        },
        paper: {
          sx: {
            borderRadius: "16px",
            border: isDark ? "1px solid rgba(0, 240, 255, 0.3)" : "1px solid #e2e8f0",
            boxShadow: isDark
              ? "0 25px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 240, 255, 0.15)"
              : "0 20px 40px rgba(0, 0, 0, 0.2)",
            backgroundColor: isDark ? "#1a1e2d" : "#ffffff",
            color: isDark ? "#f8fafc" : "inherit",
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <VerifiedIcon sx={{ color: isDark ? "#00F0FF" : "primary.main", fontSize: 32 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#f8fafc" : "inherit" }}>
              Live Third-Party Match Verification Engine
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
              Candidate: {candidateName} (ID: #{candidateId})
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : undefined }} />

      <DialogContent sx={{ minHeight: 380, py: 3 }}>
        {!result && !loading && (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <VerifiedIcon sx={{ fontSize: 80, color: isDark ? "#00F0FF" : "primary.main", mb: 2, opacity: 0.8 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: isDark ? "#f8fafc" : "inherit" }}>
              Simulate Live Third-Party Verification
            </Typography>
            <Typography sx={{ color: isDark ? "#94a3b8" : "text.secondary", maxWidth: 500, mx: "auto", mb: 4 }}>
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
            <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: isDark ? "#f8fafc" : "inherit" }}>
              Querying Govt & Judicial Records Vaults...
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? "#38bdf8" : "primary.main", fontWeight: 600 }}>
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
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: isDark ? "#38bdf8" : "primary.main" }}>
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
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: isDark ? "#f8fafc" : "text.primary" }}>
              🌐 Govt Gateway & Judicial Verification Results
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* 1. PAN Check Card */}
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: isDark ? "rgba(30, 41, 59, 0.6)" : "#ffffff", borderColor: result.panCheck.status === "Verified" ? "success.main" : "warning.main", color: isDark ? "#f8fafc" : "inherit" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <BadgeIcon color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#f8fafc" : "inherit" }}>
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
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                    PAN No: <b style={{ color: isDark ? "#f8fafc" : "inherit" }}>{result.panCheck.panNumber}</b>
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                    Matched Name: <b style={{ color: isDark ? "#f8fafc" : "inherit" }}>{result.panCheck.matchedName}</b>
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                    Score: <b style={{ color: isDark ? "#38bdf8" : "inherit" }}>{result.panCheck.nameMatchScore}%</b>
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: isDark ? "#64748b" : "text.disabled" }}>
                  Source: {result.panCheck.issuedBy}
                </Typography>
              </Paper>

              {/* 2. Aadhaar Check Card */}
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: isDark ? "rgba(30, 41, 59, 0.6)" : "#ffffff", borderColor: result.aadhaarCheck.status === "Verified" ? "success.main" : "warning.main", color: isDark ? "#f8fafc" : "inherit" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FingerprintIcon color="secondary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#f8fafc" : "inherit" }}>
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
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                    Aadhaar Ref: <b style={{ color: isDark ? "#f8fafc" : "inherit" }}>{result.aadhaarCheck.maskedAadhaar}</b>
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                    Name Score: <b style={{ color: isDark ? "#38bdf8" : "inherit" }}>{result.aadhaarCheck.nameMatchScore}%</b>
                  </Typography>
                  <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                    Address: <b style={{ color: isDark ? "#f8fafc" : "inherit" }}>{result.aadhaarCheck.addressMatched ? "Matched" : "Mismatch"}</b>
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: isDark ? "#64748b" : "text.disabled" }}>
                  Source: {result.aadhaarCheck.issuedBy}
                </Typography>
              </Paper>

              {/* 3. Criminal Check Card */}
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, bgcolor: isDark ? "rgba(30, 41, 59, 0.6)" : "#ffffff", borderColor: result.criminalCheck.status === "Clean" ? "success.main" : "error.main", color: isDark ? "#f8fafc" : "inherit" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <GavelIcon color={result.criminalCheck.status === "Clean" ? "success" : "error"} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#f8fafc" : "inherit" }}>
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
                <Typography variant="body2" sx={{ fontWeight: 600, color: result.criminalCheck.status === "Clean" ? (isDark ? "#4ade80" : "success.dark") : (isDark ? "#f87171" : "error.dark"), mb: 1 }}>
                  {result.criminalCheck.summary}
                </Typography>
                <Typography variant="caption" sx={{ display: "block", color: isDark ? "#64748b" : "text.disabled" }}>
                  Database Searched: {result.criminalCheck.databaseSearched}
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e2e8f0" }}>
        {result && (
          <Button
            onClick={handleStartVerification}
            variant="outlined"
            disabled={loading}
            sx={{
              borderColor: isDark ? "#00F0FF" : "primary.main",
              color: isDark ? "#00F0FF" : "primary.main",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#00F0FF",
                bgcolor: "rgba(0, 240, 255, 0.1)",
              },
            }}
          >
            Re-Run Matching Engine
          </Button>
        )}
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: isDark ? "rgba(255, 255, 255, 0.15)" : "#334155",
            color: "#ffffff",
            fontWeight: 600,
            "&:hover": {
              bgcolor: isDark ? "rgba(255, 255, 255, 0.25)" : "#1e293b",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
