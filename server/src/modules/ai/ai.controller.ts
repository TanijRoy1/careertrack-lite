import { Request, Response } from "express";
import { AIService } from "./ai.service";

const analyzeJob = async (req: Request, res: Response) => {
  try {
    const { jobDescription } = req.body;

    const result = await AIService.analyzeJobDescription(jobDescription);

    res.status(200).json({
      success: true,
      message: "Job analyzed successfully.",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI service is currently unavailable.",
    });
  }
};

export const AIController = {
  analyzeJob,
};
