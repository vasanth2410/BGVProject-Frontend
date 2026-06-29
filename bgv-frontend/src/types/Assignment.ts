export interface Assignment {
  id: number;
  candidateId: number;
  candidateName: string;
  reviewerId: number;
  reviewerName: string;
  assignedDate: string;
}

export interface Reviewer {
  id: number;
  fullName: string;
}