import apiClient from "../api/apiClient";
import type { RecentCandidate }
from "../types/AdminDashboard";

export const getPendingCandidates =
  async () => {

    const response =
      await apiClient.get(
        "/AdminDashboard/pending-candidates"
      );

    return response.data;
  };

export const getCompletedCandidates =
  async () => {

    const response =
      await apiClient.get(
        "/AdminDashboard/completed-candidates"
      );

    return response.data;
  };

export const getRejectedCandidates =
  async () => {

    const response =
      await apiClient.get(
        "/AdminDashboard/rejected-candidates"
      );

    return response.data;
  };
  export const getRecentCandidates =
async () => {

    const response =
        await apiClient.get<
            RecentCandidate[]
        >(
            "/AdminDashboard/recent-candidates"
        );

    return response.data;

};