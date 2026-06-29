import apiClient
from "../api/apiClient";

import type
{
    Audit,
}
from "../types/Audit";

export async function
getAuditLogs()
{
    const response =
        await apiClient.get<Audit[]>(
            "/Audit"
        );

    return response.data;
}