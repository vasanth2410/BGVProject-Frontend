import apiClient from "../api/apiClient";
import type { Notification } from "../types/Notification";



export const getNotifications =
  async (): Promise<Notification[]> => {

    const response =
      await apiClient.get(
        "/Notification"
      );

    return response.data;
  };
  export const getPendingNotifications = async () => {
  const response =
    await apiClient.get(
      "/Notification/pending"
    );

  return response.data;
};

export const getDeadLetters = async () => {
  const response =
    await apiClient.get(
      "/Notification/deadletters"
    );

  return response.data;
};