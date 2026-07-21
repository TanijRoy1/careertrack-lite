export interface CreateApplicationPayload {
  companyName: string;
  jobTitle: string;
  jobUrl?: string;
  source:
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

  status?:
    | "SAVED"
    | "APPLIED"
    | "ASSESSMENT"
    | "INTERVIEW"
    | "REJECTED"
    | "OFFER";

  applicationDate: string;

  notes?: string;
}

export interface UpdateApplicationPayload {
  companyName?: string;
  jobTitle?: string;
  jobUrl?: string;

  source?:
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

  status?:
    | "SAVED"
    | "APPLIED"
    | "ASSESSMENT"
    | "INTERVIEW"
    | "REJECTED"
    | "OFFER";

  applicationDate?: string;

  notes?: string;
}

export interface ApplicationQuery {
  search?: string;
  status?: string;
  source?: string;

  sort?: "newest" | "oldest";

  page?: string;
  limit?: string;
}
