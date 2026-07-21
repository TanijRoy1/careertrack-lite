import type { Application } from "./application.types";

export interface DashboardStats {
  totalApplications: number;
  savedJobs: number;
  appliedJobs: number;
  assessments: number;
  interviews: number;
  rejections: number;
  offers: number;
  recentApplications: Application[];
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
}
