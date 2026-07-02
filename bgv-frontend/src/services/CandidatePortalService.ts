import apiClient from "../api/apiClient";



import type {
  CandidateDashboard,
  CandidateProfile,
  CandidateVerification,
  CandidateDocument,
} from "../types/CandidatePortal";

export async function getCandidateDashboard() {

  const response =
    await apiClient.get<CandidateDashboard>(
      "/CandidatePortal/dashboard"
    );

  return response.data;

}

export async function getCandidateProfile() {

  const response =
    await apiClient.get<CandidateProfile>(
      "/CandidatePortal/profile"
    );

  return response.data;

}

export async function getCandidateVerifications() {

  const response =
    await apiClient.get<
      CandidateVerification[]
    >(
      "/CandidatePortal/verifications"
    );

  return response.data;

}

export async function getCandidateDocuments() {

  const response =
    await apiClient.get<
      CandidateDocument[]
    >(
      "/CandidatePortal/documents"
    );

  return response.data;

}

export async function uploadDocument(
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await apiClient.post(
      "/CandidatePortal/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
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

  const blob = new Blob([
    response.data,
  ]);

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  const contentDisposition =
    response.headers["content-disposition"];

  let fileName = "document";

  if (contentDisposition) {

    const match =
      contentDisposition.match(
        /filename="?([^"]+)"?/
      );

    if (match) {

      fileName = match[1];

    }

  }

  link.setAttribute(
    "download",
    fileName
  );

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

}