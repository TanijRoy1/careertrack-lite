import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { ApplicationService } from "./application.service";

const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ApplicationService.createApplication(
      req.user!.id,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Application created successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

const getApplications = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ApplicationService.getApplications(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Applications retrieved successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const ApplicationController = {
  createApplication,
  getApplications,
};
