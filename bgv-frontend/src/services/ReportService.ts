import apiClient from "../api/apiClient";

export async function exportCandidatesReport() {

    const response = await apiClient.get(
        "/Report/candidates",
        {
            responseType: "blob",
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data])
    );

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
        "download",
        "Candidates.xlsx"
    );

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

}