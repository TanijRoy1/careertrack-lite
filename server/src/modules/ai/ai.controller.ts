import { Request, Response } from "express";
import { AIService } from "./ai.service";

const analyzeJob = async (req: Request, res: Response) => {
  const { jobDescription } = req.body;

  const result = await AIService.analyzeJob(jobDescription);

  res.status(200).json({
    success: true,
    message: "Job analyzed successfully.",
    data: result,
  });
};

export const AIController = {
  analyzeJob,
};
