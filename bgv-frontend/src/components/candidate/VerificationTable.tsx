import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
  Typography,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import type { CandidateVerification } from "../../types/CandidatePortal";

interface Props {
  data: CandidateVerification[];
}

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return <PictureAsPdfIcon sx={{ color: "#EF4444", fontSize: 20 }} />;
  if (["png", "jpg", "jpeg", "webp"].includes(ext || "")) return <ImageIcon sx={{ color: "#3B82F6", fontSize: 20 }} />;
  return <InsertDriveFileIcon sx={{ color: "#F59E0B", fontSize: 20 }} />;
}

export default function VerificationTable({ data }: Props) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "var(--card-bg, #1E293B)",
        backgroundImage: "none",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Document ID & Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Verification Progress</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>
                No verification checkpoints available.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => {
              const isApproved = item.status === "Approved";
              const isRejected = item.status === "Rejected" || item.status === "Needs Action";

              return (
                <TableRow key={item.documentId} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      {getFileIcon(item.fileName)}
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "var(--text-color, #F8FAFC)" }}>
                          {item.fileName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          ID: #{item.documentId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ flexGrow: 1, height: 6, bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 3, overflow: "hidden" }}>
                        <Box
                          sx={{
                            height: "100%",
                            width: isApproved ? "100%" : isRejected ? "100%" : "50%",
                            bgcolor: isApproved ? "#10B981" : isRejected ? "#EF4444" : "#F59E0B",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, minWidth: "75px", color: isApproved ? "#10B981" : isRejected ? "#EF4444" : "#F59E0B" }}>
                        {isApproved ? "4/4 Done" : isRejected ? "Action Req." : "2/4 Review"}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="right">
                    <Chip
                      label={isApproved ? "Approved" : isRejected ? "Rejected" : item.status || "Pending"}
                      color={isApproved ? "success" : isRejected ? "error" : "warning"}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        px: 1,
                        borderRadius: "6px",
                        boxShadow: isApproved
                          ? "0 0 10px rgba(22, 163, 74, 0.3)"
                          : isRejected
                          ? "0 0 10px rgba(239, 68, 68, 0.3)"
                          : "0 0 10px rgba(245, 158, 11, 0.3)",
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}