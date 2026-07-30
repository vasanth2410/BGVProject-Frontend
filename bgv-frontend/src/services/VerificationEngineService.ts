import apiClient from "../api/apiClient";
import type { OcrResult, LiveVerificationResult } from "../types/VerificationEngine";

export async function scanDocumentOcr(documentId: number): Promise<OcrResult> {
  const response = await apiClient.post<OcrResult>(`/VerificationEngine/ocr-scan/${documentId}`);
  return response.data;
}

export async function runLiveVerification(candidateId: number): Promise<LiveVerificationResult> {
  const response = await apiClient.post<LiveVerificationResult>(`/VerificationEngine/live-verify/${candidateId}`);
  return response.data;
}

export async function getLiveStatus(candidateId: number): Promise<LiveVerificationResult> {
  const response = await apiClient.get<LiveVerificationResult>(`/VerificationEngine/live-status/${candidateId}`);
  return response.data;
}
