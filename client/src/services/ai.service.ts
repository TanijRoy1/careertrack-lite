import type { AxiosInstance } from "axios";
import type { AIAnalysisResponse } from "../types/ai.types";

const analyzeJob = async (
  axiosSecure: AxiosInstance,
  jobDescription: string,
) => {
  const response = await axiosSecure.post<AIAnalysisResponse>(
    "/ai/analyze-job",
    {
      jobDescription,
    },
  );

  return response.data;
};

export const AIService = {
  analyzeJob,
};
