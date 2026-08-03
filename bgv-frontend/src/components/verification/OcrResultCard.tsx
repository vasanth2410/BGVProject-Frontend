import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import type { OcrResult } from "../../types/VerificationEngine";

interface OcrResultCardProps {
  ocrData: OcrResult;
}

export const OcrResultCard: React.FC<OcrResultCardProps> = ({ ocrData }) => {
  const isDark = document.body.classList.contains("dark-mode");

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        background: isDark
          ? "rgba(15, 23, 42, 0.75)"
          : "linear-gradient(135deg, rgba(25,118,210,0.04) 0%, rgba(156,39,176,0.04) 100%)",
        border: isDark
          ? "1px solid rgba(56, 189, 248, 0.25)"
          : "1px solid rgba(25,118,210,0.2)",
        color: isDark ? "#f8fafc" : "inherit",
        mb: 3,
        boxShadow: isDark
          ? "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 240, 255, 0.08)"
          : 4,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <DocumentScannerIcon sx={{ color: isDark ? "#00F0FF" : "primary.main", fontSize: 32 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2, color: isDark ? "#f8fafc" : "inherit" }}>
                OCR Auto-Extracted Details
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
                AI Powered Document Reading Engine
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={<CheckCircleOutlinedIcon style={{ color: "#ffffff" }} />}
            label={`${ocrData.confidenceScore}% Confidence`}
            color={ocrData.confidenceScore > 90 ? "success" : "warning"}
            variant="filled"
            sx={{ fontWeight: 700, borderRadius: 2 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary" }}>
              Extraction Confidence Metric
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? "#38bdf8" : "inherit" }}>
              {ocrData.confidenceScore}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={ocrData.confidenceScore}
            color={ocrData.confidenceScore > 90 ? "success" : "warning"}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : undefined,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            p: 2,
            bgcolor: isDark ? "rgba(30, 41, 59, 0.7)" : "#ffffff",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid #e2e8f0",
            borderRadius: 2,
            boxShadow: isDark ? "none" : 1,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary", display: "block", mb: 0.25 }}>
              Detected Document Type
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color: isDark ? "#38bdf8" : "primary.main" }}>
              {ocrData.documentType}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary", display: "block", mb: 0.25 }}>
              Extracted Doc ID / Number
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: "monospace", letterSpacing: 1, color: isDark ? "#f8fafc" : "inherit" }}>
              {ocrData.extractedDocumentNumber || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary", display: "block", mb: 0.25 }}>
              Extracted Holder Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#f8fafc" : "inherit" }}>
              {ocrData.extractedName || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "text.secondary", display: "block", mb: 0.25 }}>
              Extracted Date of Birth
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#f8fafc" : "inherit" }}>
              {ocrData.extractedDob || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Accordion sx={{ boxShadow: 0, bgcolor: "transparent", "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: isDark ? "#38bdf8" : "inherit" }} />} sx={{ px: 0, minHeight: 36 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: isDark ? "#38bdf8" : "primary.main" }}>
              View Raw OCR Recognized Text
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                bgcolor: isDark ? "rgba(15, 23, 42, 0.9)" : "action.hover",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : undefined,
                color: isDark ? "#cbd5e1" : "inherit",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                whiteSpace: "pre-wrap",
                borderRadius: 2,
              }}
            >
              {ocrData.rawText}
            </Paper>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};
