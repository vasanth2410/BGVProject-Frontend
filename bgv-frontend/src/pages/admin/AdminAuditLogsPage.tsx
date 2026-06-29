import { useEffect, useState } from "react";

import
{
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Chip,
}
from "@mui/material";

import
{
    getAuditLogs,
}
from "../../services/AuditService";

import type
{
    Audit,
}
from "../../types/Audit";

export default function AdminAuditLogsPage()
{
    const
        [logs, setLogs]
        =
        useState<Audit[]>([]);

    useEffect(() =>
    {
        const load = async () =>
        {
            try
            {
                const result =
                    await getAuditLogs();

                setLogs(result);
            }
            catch (error)
            {
                console.error(error);
            }
        };

        void load();

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

                Audit Logs

            </Typography>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>ID</TableCell>

                            <TableCell>Action</TableCell>

                            <TableCell>User</TableCell>

                            <TableCell>Role</TableCell>

                            <TableCell>Date</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            logs.map(log => (

                                <TableRow
                                    key={log.id}
                                    hover
                                >

                                    <TableCell>

                                        {log.id}

                                    </TableCell>

                                    <TableCell>

                                        {log.action}

                                    </TableCell>

                                    <TableCell>

                                        {log.performedBy}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={log.role}
                                            color="primary"
                                            size="small"
                                        />

                                    </TableCell>

                                    <TableCell>

                                        {

                                            new Date(
                                                log.performedAt
                                            ).toLocaleString()

                                        }

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );
}