export interface Candidate {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface VerificationProgress {
  candidateName: string;
  completedDocs: number;
  totalDocs: number;
}

export interface PendingDocument {
  id: number;
  candidateName: string;
  documentType: string;
  fileName: string;
  uploadedOn: string;
  status: string;
}