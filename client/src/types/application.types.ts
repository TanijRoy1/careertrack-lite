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
  source: Application["source"];
  status: Application["status"];
  applicationDate: string;
  notes?: string;
}
