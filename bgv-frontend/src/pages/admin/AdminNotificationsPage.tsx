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
} from "@mui/material";

import {
  getAllNotifications,
} from "../../services/AdminNotificationService";

export default function AdminNotificationsPage() {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const result =
          await getAllNotifications();

        setNotifications(result);

      }
      catch (error) {

        console.error(error);

      }

    };

    void loadData();

  }, []);

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
        Notifications
      </Typography>

      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>ID</TableCell>

              <TableCell>Email</TableCell>

              <TableCell>Subject</TableCell>

              <TableCell>Status</TableCell>

              <TableCell>Created</TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {notifications.map((n) => (

              <TableRow key={n.id}>

                <TableCell>
                  {n.id}
                </TableCell>

                <TableCell>
                  {n.toEmail}
                </TableCell>

                <TableCell>
                  {n.subject}
                </TableCell>

                <TableCell>

                  <Chip
                    label={n.status}
                    color={
                      n.status === "Sent"
                        ? "success"
                        : "error"
                    }
                  />

                </TableCell>

                <TableCell>
                  {new Date(
                    n.createdAt
                  ).toLocaleString()}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Paper>

  );

}