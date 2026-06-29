import apiClient from "../api/apiClient";

import type { CandidateDetails } from "../types/CandidateDetails";

import type {
  Candidate,
  CreateCandidateRequest,
} from "../types/CandidateManagement";

export async function getCandidates() {

  const response =
    await apiClient.get<Candidate[]>(
      "/Candidates"
    );

  return response.data;
}

export async function createCandidate(
  data: CreateCandidateRequest
) {

  const response =
    await apiClient.post(
      "/Candidates",
      data
    );

  return response.data;
}

export async function getCandidateById(
  id: number
) {

  const response =
    await apiClient.get(
      `/Candidates/${id}`
    );

  return response.data;
}

export async function updateCandidate(
  id: number,
  data: CreateCandidateRequest
) {

  const response =
    await apiClient.put(
      `/Candidates/${id}`,
      data
    );

  return response.data;
}

export async function deleteCandidate(
  id: number
) {

  const response =
    await apiClient.delete(
      `/Candidates/${id}`
    );

  return response.data;
}
export async function getCandidateDetails(
  id: number
) {
  const response =
    await apiClient.get<CandidateDetails>(
      `/Candidates/details/${id}`
    );

  return response.data;
}