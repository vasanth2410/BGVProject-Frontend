export interface CandidateDashboard {

  candidateName: string;

  documentsUploaded: number;

  approvedDocuments: number;

  pendingDocuments: number;

  rejectedDocuments: number;

  overallStatus: string;

}

export interface CandidateProfile {

  id: number;

  fullName: string;

  email: string;

  phoneNumber: string;

  appliedRole: string;

  status: string;

}

export interface CandidateVerification {

  documentId: number;

  fileName: string;

  status: string;

}

/* ===========================
   Candidate Documents
=========================== */

export interface CandidateDocument {

  id: number;

  fileName: string;

  fileType: string;

  status: string;

  uploadedDate: string;

}