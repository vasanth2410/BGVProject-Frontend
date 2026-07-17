import apiClient from "../api/apiClient";
import type {
  LoginRequest,
  LoginResponse,
} from "../types/Auth";

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post(
    "/Auth/login",
    request
  );

  return response.data;
};

export const resetPassword = async (
  email: string,
  newPassword: string
): Promise<string> => {
  const response = await apiClient.post(
    `/Auth/reset-password?email=${encodeURIComponent(email)}&newPassword=${encodeURIComponent(newPassword)}`
  );

  return response.data;
};