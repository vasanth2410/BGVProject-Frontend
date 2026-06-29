import apiClient from "../api/apiClient";

import type {
  CreateCandidateRequest,
} from "../types/CandidateManagement";

export const getCandidates = async () => {
  const response =
    await apiClient.get("/Candidates");

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

export const createCandidate =
  async (
    data: CreateCandidateRequest
  ) => {

    const response =
      await apiClient.post(
        "/Candidates",
        data
      );

    return response.data;
  };

export const updateCandidate =
  async (
    id: number,
    data: CreateCandidateRequest
  ) => {

    const response =
      await apiClient.put(
        `/Candidates/${id}`,
        data
      );

    return response.data;
  };

export const deleteCandidate =
  async (id: number) => {

    const response =
      await apiClient.delete(
        `/Candidates/${id}`
      );

    return response.data;
  };