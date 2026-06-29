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
deleteDocument(
  id: number,
)
{
  await apiClient.delete(
    `/Documents/${id}`
  );
}

export function
getDocumentUrl(
  documentId: number,
)
{
  return `${apiClient.defaults.baseURL}/Documents/download/${documentId}`;
}

export function downloadDocument(documentId: number) {

    window.open(
        getDocumentUrl(documentId),
        "_blank"
    );

}