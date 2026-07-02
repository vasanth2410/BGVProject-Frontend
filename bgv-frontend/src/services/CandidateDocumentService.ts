import apiClient from "../api/apiClient";
import type { CandidateDocument } from "../types/CandidateDocument";

export async function getCandidateDocuments() {
  const response =
    await apiClient.get<CandidateDocument[]>(
      "/CandidatePortal/documents"
    );

  return response.data;
}

export async function downloadCandidateDocument(
  id: number
) {
  const response =
    await apiClient.get(
      `/CandidatePortal/download/${id}`,
      {
        responseType: "blob",
      }
    );

  return response.data;
}