import { useEffect, useState } from "react";



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

        <>
            <div style={{ padding: "30px" }}>
                <div className="page-header">
                    <h1 className="page-title">
                        Audit Logs
                    </h1>
                </div>

                <div className="table-container">
                    <table className="candidate-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Action</th>
                                <th>User</th>
                                <th>Role</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                logs.map(log => (
                                    <tr key={log.id}>
                                        <td>
                                            {log.id}
                                        </td>
                                        <td>
                                            {log.action}
                                        </td>
                                        <td>
                                            {log.performedBy}
                                        </td>
                                        <td>
                                            {log.role}
                                        </td>
                                        <td>
                                            {
                                                new Date(
                                                    log.performedAt
                                                ).toLocaleString()
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}