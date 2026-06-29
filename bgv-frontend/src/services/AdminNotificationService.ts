import apiClient
from "../api/apiClient";

export const getAllNotifications =
  async () => {

    const response =
      await apiClient.get(
        "/Notification"
      );

    return response.data;
  };

export const getPendingNotifications =
  async () => {

    const response =
      await apiClient.get(
        "/Notification/pending"
      );

    return response.data;
  };

export const getDeadLetters =
  async () => {

    const response =
      await apiClient.get(
        "/Notification/deadletters"
      );

    return response.data;
  };

export const getNotificationById =
  async (id: number) => {

    const response =
      await apiClient.get(
        `/Notification/${id}`
      );

    return response.data;
  };