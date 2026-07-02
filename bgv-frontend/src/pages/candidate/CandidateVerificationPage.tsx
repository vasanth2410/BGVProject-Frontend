import {
  useEffect,
  useState,
} from "react";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
} from "@mui/material";

import {
  getCandidateVerifications,
} from "../../services/CandidatePortalService";

import type {
  CandidateVerification,
} from "../../types/CandidatePortal";

export default function CandidateVerificationPage() {

  const [
    verifications,
    setVerifications,
  ] =
    useState<CandidateVerification[]>([]);

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      try {

        const result =
          await getCandidateVerifications();

        setVerifications(result);

      }

      catch (error) {

        console.error(error);

      }

    };

  return (

    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Verification Status
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Document ID
            </TableCell>

            <TableCell>
              File Name
            </TableCell>

            <TableCell>
              Status
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {verifications.map((item) => (

            <TableRow
              key={item.documentId}
            >

              <TableCell>
                {item.documentId}
              </TableCell>

              <TableCell>
                {item.fileName}
              </TableCell>

              <TableCell>

                <Chip
                  label={item.status}
                  color={
                    item.status === "Approved"
                      ? "success"
                      : item.status === "Rejected"
                      ? "error"
                      : "warning"
                  }
                />

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>

  );

}