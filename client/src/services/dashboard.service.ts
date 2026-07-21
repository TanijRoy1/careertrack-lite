import type { AxiosInstance } from "axios";

const getDashboardStats = async (axiosSecure: AxiosInstance) => {
  const response = await axiosSecure.get("/dashboard/stats");

  return response.data;
};

export const DashboardService = {
  getDashboardStats,
};
