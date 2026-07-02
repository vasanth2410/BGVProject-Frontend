import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

import type {
  CandidateVerification,
} from "../../types/CandidatePortal";

interface Props {
  data: CandidateVerification[];
}

export default function VerificationTable({
  data,
}: Props) {

  return (

    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Document
            </TableCell>

            <TableCell>
              Status
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {data.map((item) => (

            <TableRow
              key={item.documentId}
            >

              <TableCell>
                {item.fileName}
              </TableCell>

              <TableCell>

                <Chip
                  label={item.status}
                  color={
                    item.status ===
                    "Approved"
                      ? "success"
                      : item.status ===
                        "Rejected"
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