export type ApplicationStatus =
  | "SAVED"
  | "APPLIED"
  | "ASSESSMENT"
  | "INTERVIEW"
  | "REJECTED"
  | "OFFER";

export type ApplicationSource =
  | "LINKEDIN"
  | "BDJOBS"
  | "INDEED"
  | "WELLFOUND"
  | "FACEBOOK"
  | "DISCORD"
  | "INTERNSHALA"
  | "UNSTOP"
  | "REFERRAL"
  | "OTHER";

export interface Application {
  id: string;

  companyName: string;

  jobTitle: string;

  jobUrl?: string;

  source: ApplicationSource;

  status: ApplicationStatus;

  applicationDate: string;

  notes?: string;

  userId: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateApplicationPayload {
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  source: string;
  status: string;
  applicationDate: string;
  notes?: string;
}

export const APPLICATION_STATUS = [
  "SAVED",
  "APPLIED",
  "ASSESSMENT",
  "INTERVIEW",
  "REJECTED",
  "OFFER",
] as const;

export const APPLICATION_SOURCE = [
  "LINKEDIN",
  "BDJOBS",
  "INDEED",
  "WELLFOUND",
  "FACEBOOK",
  "DISCORD",
  "INTERNSHALA",
  "UNSTOP",
  "REFERRAL",
  "OTHER",
] as const;

export interface ApplicationQueryParams {
  search?: string;
  status?: string;
  source?: string;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
}
