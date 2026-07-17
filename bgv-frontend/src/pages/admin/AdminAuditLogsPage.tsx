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
    const [logs, setLogs] = useState<Audit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() =>
    {
        const load = async () =>
        {
            try
            {
                setLoading(true);
                setErrorMsg("");
                const result = await getAuditLogs();
                setLogs(result);
            }
            catch (error: any)
            {
                console.error(error);
                setErrorMsg(error.response?.data || error.message || "Failed to load audit logs");
            }
            finally
            {
                setLoading(false);
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
                            {loading ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                        Loading audit logs...
                                    </td>
                                </tr>
                            ) : errorMsg ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "#ef4444", fontWeight: "600" }}>
                                        Error: {errorMsg}
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                                        No audit logs found.
                                    </td>
                                </tr>
                            ) : (
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
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}