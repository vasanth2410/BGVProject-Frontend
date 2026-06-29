import apiClient
from "../api/apiClient";

import type {
  Verification,
}
from "../types/Verification";

export async function
getAllVerifications() {

  const response =
    await apiClient.get<
      Verification[]
    >("/Verification");

  return response.data;

}

export async function
getVerificationById(
  id: number,
) {

  const response =
    await apiClient.get<
      Verification
    >(`/Verification/${id}`);

  return response.data;

}