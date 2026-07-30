export interface OcrResult {
  documentId: number;
  documentType: string;
  extractedDocumentNumber: string;
  extractedName: string;
  extractedDob: string;
  confidenceScore: number;
  rawText: string;
  status: string;
}

export interface PanMatchResult {
  status: string;
  panNumber: string;
  matchedName: string;
  nameMatchScore: number;
  issuedBy: string;
  verificationTime: string;
}

export interface AadhaarMatchResult {
  status: string;
  maskedAadhaar: string;
  matchedName: string;
  nameMatchScore: number;
  addressMatched: boolean;
  issuedBy: string;
  verificationTime: string;
}

export interface CriminalMatchResult {
  status: string;
  recordsFound: number;
  courtCaseCount: number;
  summary: string;
  databaseSearched: string;
  verificationTime: string;
}

export interface LiveVerificationResult {
  candidateId: number;
  candidateName: string;
  panCheck: PanMatchResult;
  aadhaarCheck: AadhaarMatchResult;
  criminalCheck: CriminalMatchResult;
  overallStatus: string;
  overallConfidenceScore: number;
  verifiedAt: string;
}
