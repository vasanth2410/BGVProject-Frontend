import {
  useEffect,
  useState,
} from "react";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
  Box,
} from "@mui/material";

import {
  getNotifications,
} from "../../services/NotificationService";

import type {
  Notification,
} from "../../types/Notification";

export default function ReviewerNotificationsPage() {

  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>([]);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          const result =
            await getNotifications();

          setNotifications(
            result
          );

        }
        catch (error) {

          console.error(error);

        }
      };

    void loadData();

  }, []);

  return (

    <Box
      sx={{
        width: "100%",
      }}
    >

      <Paper
  sx={{
    p: {
      xs: 2,
      sm: 3,
      md: 4,
    },

    borderRadius: 3,
  }}
>

        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          Notifications
        </Typography>

        <TableContainer
  sx={{
    width: "100%",
    overflowX: "auto",
  }}
>

         <Table sx={{ minWidth: 850 }}>

            <TableHead>

              <TableRow>

                <TableCell>
                  Subject
                </TableCell>

                <TableCell>
                  Email
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell>
                  Created
                </TableCell>

                <TableCell>
                  Sent
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {notifications.map(
                (n) => (

                  <TableRow
                    key={n.id}
                    hover
                  >

                    <TableCell>
                      {n.subject}
                    </TableCell>

                    <TableCell>
                      {n.toEmail}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={n.status}
                        color={
                          n.status === "Sent"
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />

                    </TableCell>

                    <TableCell>

                      {new Date(
                        n.createdAt
                      ).toLocaleString()}

                    </TableCell>

                    <TableCell>

                      {n.sentAt
                        ? new Date(
                            n.sentAt
                          ).toLocaleString()
                        : "Not Sent"}

                    </TableCell>

                  </TableRow>

                )
              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Paper>

    </Box>

  );
}