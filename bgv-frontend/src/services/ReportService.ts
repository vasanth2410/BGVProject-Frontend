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

export async function downloadCandidatePdfReport(candidateId: number, candidateName?: string) {
    const response = await apiClient.get(
        `/Report/candidate/${candidateId}/pdf`,
        {
            responseType: "blob",
        }
    );

    const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
    );

    const safeName = candidateName ? candidateName.replace(/[^a-zA-Z0-9]/g, "_") : `Candidate_${candidateId}`;
    const filename = `BGV_Verification_Report_${safeName}.pdf`;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
}