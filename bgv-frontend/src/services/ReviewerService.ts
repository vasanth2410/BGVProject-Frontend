import apiClient from "../api/apiClient";

export const getMyAssignments =
  async (reviewerId: number) => {

    const response =
      await apiClient.get(
        `/Assignment/reviewer/${reviewerId}`
      );

    return response.data;
  };

export const getCandidateById =
  async (id: number) => {

    const response =
      await apiClient.get(
        `/Candidates/${id}`
      );

    return response.data;
  };

export const getCandidateDocuments =
  async (
    candidateId: number
  ) => {

    const response =
      await apiClient.get(
        `/Documents/candidate/${candidateId}`
      );

    return response.data;
  };

export const getVerifications =
async () => {

    const response =
        await apiClient.get(
            "/Reviewer/verifications"
        );

    return response.data;
};

export const approveVerification =
  async (
    id: number,
    remarks: string
  ) => {

    const response =
      await apiClient.put(
        `/Verification/approve/${id}?remarks=${remarks}`
      );

    return response.data;
  };

export const rejectVerification =
  async (
    id: number,
    remarks: string
  ) => {

    const response =
      await apiClient.put(
        `/Verification/reject/${id}?remarks=${remarks}`
      );

    return response.data;
  };
  export const getReviewerDashboard =
  async () => {

    const response =
      await apiClient.get(
        "/Reviewer/dashboard"
      );

    return response.data;
};
export const getVerificationById =
async (id: number) => {

    const response =
        await apiClient.get(
            `/Verification/${id}`
        );

    return response.data;
};
export async function reReviewVerification(
  id: number
) {
  const response =
    await apiClient.put(
      `/Verification/rereview/${id}`
    );

  return response.data;
}
// ===============================
// New Reviewer APIs
// ===============================

export const getAssignedCandidates =
async () => {

    const response =
        await apiClient.get(
            "/Reviewer/assigned-candidates"
        );

    return response.data;

};

export const getReviewerCandidate =
async (
    candidateId: number
) => {

    const response =
        await apiClient.get(
            `/Reviewer/candidate/${candidateId}`
        );

    return response.data;

};

export const getReviewerCandidateDocuments =
async (
    candidateId: number
) => {

    const response =
        await apiClient.get(
            `/Reviewer/candidate/${candidateId}/documents`
        );

    return response.data;

};

export const getReviewerCandidateVerifications =
async (
    candidateId: number
) => {

    const response =
        await apiClient.get(
            `/Reviewer/candidate/${candidateId}/verifications`
        );

    return response.data;

};

export const getReviewerDocument =
async (
    documentId: number
) => {

    const response =
        await apiClient.get(
            `/Reviewer/document/${documentId}`
        );

    return response.data;

};

export const downloadReviewerDocument =
async (
    documentId: number
) => {

    const response =
        await apiClient.get(
            `/Reviewer/document/download/${documentId}`,
            {
                responseType: "blob",
            }
        );

    const url =
        window.URL.createObjectURL(
            response.data
        );

    const link =
        document.createElement("a");

    link.href = url;

    const disposition =
        response.headers[
            "content-disposition"
        ];

    let fileName =
        "document";

    if (disposition) {

        const match =
            disposition.match(
                /filename="?(.+?)"?$/
            );

        if (match) {

            fileName =
                match[1];

        }

    }

    link.download =
        fileName;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

};

export const reviewDocument =
async (
    documentId: number,
    status: string,
    remarks: string
) => {

    const response =
        await apiClient.put(
            `/Reviewer/document/${documentId}/review`,
            {
                status,
                remarks,
            }
        );

    return response.data;

};
export const getReviewerDocuments =
async () => {

    const response =
        await apiClient.get(
            "/Reviewer/documents"
        );

    return response.data;
};