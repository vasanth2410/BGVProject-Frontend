import {
  useEffect,
  useState,
} from "react";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  TableContainer,
  TextField,
  Button,
  Box,
} from "@mui/material";

import VerificationDetailsDialog
from "../../components/admin/VerificationDetailsDialog";

import {
  getAllVerifications,
  getVerificationById,
} from "../../services/VerificationService";

import type {
  Verification,
} from "../../types/Verification";

export default function AdminVerificationsPage() {

  const [
    verifications,
    setVerifications,
  ] =
    useState<Verification[]>([]);

  const [

    selectedVerification,

    setSelectedVerification,

] =

useState<Verification | null>(
    null,
);

  const [
    openDialog,
    setOpenDialog,
  ] =
    useState(false);

  const [
    search,
    setSearch,
  ] =
    useState("");

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const result =
            await getAllVerifications();

          setVerifications(result);

        }

        catch (error) {

          console.error(error);

        }

      };

    void loadData();

  }, []);

  const handleView =
    async (
      id: number,
    ) => {

      try {

        const result =
          await getVerificationById(id);

        setSelectedVerification(
          result,
        );

        setOpenDialog(true);

      }

      catch (error) {

        console.error(error);

      }

    };

  const filtered =
    verifications.filter(
      (v) =>

        v.verificationType
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||

        v.status
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||

        v.candidateId
          .toString()
          .includes(search),
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
            justifyContent:
              "space-between",
            mb: 3,
          }}
        >

          <Typography
  variant="h4"
  sx={{
    fontWeight: 700,
  }}
>
  Verifications
</Typography>

          <TextField
            label="Search"
            size="small"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
          />

        </Box>

        <TableContainer>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  ID
                </TableCell>

                <TableCell>
                  Candidate
                </TableCell>

                <TableCell>
                  Verification
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell>
                  Remarks
                </TableCell>

                <TableCell>
                  Action
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filtered.map(
                (v) => (

                  <TableRow
                    key={v.id}
                  >

                    <TableCell>
                      {v.id}
                    </TableCell>

                    <TableCell>
                      {v.candidateId}
                    </TableCell>

                    <TableCell>
                      {v.verificationType}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={v.status}
                        color={
                          v.status ===
                          "Approved"

                            ? "success"

                            : v.status ===
                              "Rejected"

                            ? "error"

                            : "warning"
                        }
                      />

                    </TableCell>

                    <TableCell>

                      {v.reviewerRemarks}

                    </TableCell>

                    <TableCell>

                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() =>
                          void handleView(
                            v.id,
                          )
                        }
                      >

                        View

                      </Button>

                    </TableCell>

                  </TableRow>

                ),
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

      <VerificationDetailsDialog

        open={openDialog}

        onClose={() =>
          setOpenDialog(false)
        }

        verification={
          selectedVerification
        }

      />

    </>

  );

}