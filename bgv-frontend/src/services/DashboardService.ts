import apiClient from "../api/apiClient";

import type {
  DashboardSummary,
} from "../types/Dashboard";

export const getDashboardSummary =
  async (): Promise<DashboardSummary> => {

    const response =
      await apiClient.get(
        "/AdminDashboard/summary"
      );

    return response.data;
  };