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
function getMimeTypeFromFileName(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "xls":
      return "application/vnd.ms-excel";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "txt":
      return "text/plain";
    case "csv":
      return "text/csv";
    default:
      return "application/octet-stream";
  }
}

export async function downloadCandidateDocument(
  id: number,
  fileName?: string
) {
  const response = await apiClient.get(
    `/CandidatePortal/download/${id}`,
    {
      responseType: "blob",
    }
  );

  let downloadFileName = fileName?.trim() || "";

  if (!downloadFileName) {
    const contentDisposition = response.headers["content-disposition"];
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^";\n]+)"?/);
      if (match && match[1]) {
        downloadFileName = match[1];
      }
    }
  }

  if (!downloadFileName) {
    downloadFileName = "document";
  }

  const mimeType = getMimeTypeFromFileName(downloadFileName);
  const blob = new Blob([response.data], { type: mimeType });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", downloadFileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}