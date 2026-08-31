export interface Candidate {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  appliedRole?: string;
  dateOfJoining?: string;
  status: string;
  createdDate?: string;
}

export interface CreateCandidateRequest {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  appliedRole?: string;
  dateOfJoining?: string;
  status?: string;
}