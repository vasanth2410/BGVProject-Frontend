export interface Notification {
  id: number;
  toEmail: string;
  subject: string;
  status: string;
  createdAt: string;
  sentAt: string | null;
}