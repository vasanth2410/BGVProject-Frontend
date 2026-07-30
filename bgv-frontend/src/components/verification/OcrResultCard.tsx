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
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, rgba(25,118,210,0.04) 0%, rgba(156,39,176,0.04) 100%)",
        border: "1px solid rgba(25,118,210,0.2)",
        mb: 3,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <DocumentScannerIcon sx={{ color: "primary.main", fontSize: 32 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                OCR Auto-Extracted Details
              </Typography>
              <Typography variant="caption" color="text.secondary">
                AI Powered Document Reading Engine
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={<CheckCircleOutlinedIcon />}
            label={`${ocrData.confidenceScore}% Confidence`}
            color={ocrData.confidenceScore > 90 ? "success" : "warning"}
            variant="filled"
            sx={{ fontWeight: 700, borderRadius: 2 }}
          />
        </Box>


        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Extraction Confidence Metric
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {ocrData.confidenceScore}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={ocrData.confidenceScore}
            color={ocrData.confidenceScore > 90 ? "success" : "warning"}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 1,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Detected Document Type
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color: "primary.main" }}>
              {ocrData.documentType}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Extracted Doc ID / Number
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, fontFamily: "monospace", letterSpacing: 1 }}>
              {ocrData.extractedDocumentNumber || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Extracted Holder Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {ocrData.extractedName || "N/A"}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Extracted Date of Birth
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {ocrData.extractedDob || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Accordion sx={{ boxShadow: 0, bgcolor: "transparent", "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 36 }}>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
              View Raw OCR Recognized Text
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pt: 0 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                bgcolor: "action.hover",
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
