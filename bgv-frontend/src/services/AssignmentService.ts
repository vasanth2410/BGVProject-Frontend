import apiClient from "../api/apiClient";

export const getAssignments = async () => {
  const response =
    await apiClient.get(
      "/Assignment"
    );

  return response.data;
};

export const getReviewers = async () => {
  const response =
    await apiClient.get(
      "/Admin/reviewers"
    );

  return response.data;
};

export const createAssignment =
  async (
    candidateId: number,
    reviewerId: number
  ) => {

    const response =
      await apiClient.post(
        "/Assignment",
        {
          candidateId,
          reviewerId,
        }
      );

    return response.data;
  };

export const deleteAssignment = async (id: number) => {
  const response = await apiClient.delete(`/Assignment/${id}`);
  return response.data;
};

export const cleanupDuplicateAssignments = async () => {
  const response = await apiClient.post("/Assignment/cleanup-duplicates");
  return response.data;
};