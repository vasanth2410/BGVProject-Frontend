import apiClient
from "../api/apiClient";

import type
{
  Document,
}
from "../types/Document";

export async function
getAllDocuments()
{
  const response =
    await apiClient.get<
      Document[]
    >(
      "/Documents"
    );

  return response.data;
}

export async function
getDocumentsByCandidateId(
  candidateId: number,
)
{
  const response =
    await apiClient.get<
      Document[]
    >(
      `/Documents/candidate/${candidateId}`
    );

  return response.data;
}

export async function
deleteDocument(
  id: number,
)
{
  await apiClient.delete(
    `/Documents/${id}`
  );
}

export function getDocumentUrl(documentId: number) {
  return `${apiClient.defaults.baseURL}/Documents/download/${documentId}`;
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

function getExtensionFromMimeType(mimeType: string): string {
  if (!mimeType) return "";
  const lower = mimeType.toLowerCase();
  if (lower.includes("pdf")) return ".pdf";
  if (lower.includes("png")) return ".png";
  if (lower.includes("jpeg") || lower.includes("jpg")) return ".jpg";
  if (lower.includes("webp")) return ".webp";
  if (lower.includes("wordprocessingml") || lower.includes("docx")) return ".docx";
  if (lower.includes("msword")) return ".doc";
  if (lower.includes("sheet") || lower.includes("xlsx")) return ".xlsx";
  if (lower.includes("excel") || lower.includes("xls")) return ".xls";
  if (lower.includes("csv")) return ".csv";
  if (lower.includes("text/plain")) return ".txt";
  return "";
}

async function extractDocumentErrorMessage(error: any): Promise<string> {
  if (error?.response?.data instanceof Blob) {
    try {
      const text = await error.response.data.text();
      const parsed = JSON.parse(text);
      if (parsed?.Message || parsed?.message) {
        return parsed.Message || parsed.message;
      }
      if (parsed?.title) {
        return parsed.title;
      }
    } catch {
      // not JSON or unreadable blob text
    }
  }

  if (error?.response?.status === 401) {
    return "Session expired or unauthenticated. Please log in again.";
  }
  if (error?.response?.status === 403) {
    return "Access denied: You do not have permission to view or download this document.";
  }
  if (error?.response?.status === 404) {
    return "Document not found.";
  }
  if (error?.response?.status >= 500) {
    return "Unable to retrieve document due to server or storage error. Please try again later.";
  }
  if (error?.message) {
    return error.message;
  }
  return "Failed to access document. Please try again.";
}

export async function downloadDocument(
  documentId: number,
  fileName?: string
): Promise<void> {
  try {
    const response = await apiClient.get(
      `/Documents/download/${documentId}`,
      {
        responseType: "blob",
      }
    );

    let downloadFileName = fileName?.trim() || "";

    if (!downloadFileName) {
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?"?([^";\n]+)"?/i);
        if (match && match[1]) {
          downloadFileName = decodeURIComponent(match[1].trim());
        }
      }
    }

    if (!downloadFileName) {
      const contentType = String(response.headers["content-type"] || "");
      const ext = getExtensionFromMimeType(contentType);
      downloadFileName = `document_${documentId}${ext || ""}`;
    } else if (!downloadFileName.includes(".")) {
      const contentType = String(response.headers["content-type"] || "");
      const ext = getExtensionFromMimeType(contentType);
      if (ext) {
        downloadFileName += ext;
      }
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

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  } catch (error: any) {
    const message = await extractDocumentErrorMessage(error);
    throw new Error(message);
  }
}

export async function viewDocument(
  documentId: number,
  fileName?: string
): Promise<void> {
  // Open window synchronously during click event to prevent browser popup blocker
  const previewTab = window.open("about:blank", "_blank");
  if (!previewTab || previewTab.closed) {
    throw new Error(
      "Popup was blocked by your browser. Please allow popups for this site to preview documents."
    );
  }

  try {
    previewTab.document.write(
      "<p style='font-family:sans-serif;padding:24px;color:#475569;'>Loading document preview...</p>"
    );
  } catch {
    // In case cross-origin about:blank writing is restricted
  }

  try {
    const response = await apiClient.get(
      `/Documents/download/${documentId}`,
      {
        responseType: "blob",
      }
    );

    const viewFileName = fileName?.trim() || "";
    const contentType = String(response.headers["content-type"] || "");
    const mimeType = viewFileName
      ? getMimeTypeFromFileName(viewFileName)
      : contentType || "application/octet-stream";
    const blob = new Blob([response.data], { type: mimeType });

    const url = window.URL.createObjectURL(blob);

    if (!previewTab.closed) {
      previewTab.location.href = url;
    }

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 60000);
  } catch (error: any) {
    if (previewTab && !previewTab.closed) {
      previewTab.close();
    }
    const message = await extractDocumentErrorMessage(error);
    throw new Error(message);
  }
}