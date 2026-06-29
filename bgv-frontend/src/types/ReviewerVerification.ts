export interface ReviewerVerification {
  id: number;
  candidateId: number;
  verificationType: string;
  status: string;
  reviewerRemarks: string;
}