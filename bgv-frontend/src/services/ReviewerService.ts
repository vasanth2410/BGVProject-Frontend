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
        "/Verification"
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
  export const reReviewVerification =
  async (id: number) => {

    const response =
      await apiClient.put(
        `/Verification/rereview/${id}`
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