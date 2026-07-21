import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { ApplicationService } from "./application.service";
import { ApplicationQuery } from "../../types/application.types";

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
    const result = await ApplicationService.getApplications(
      req.user!.id,
      req.query as ApplicationQuery
    );

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

const getApplicationById = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ApplicationService.getApplicationById(
      req.user!.id,
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Application retrived successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(404).json({
      success: false,
      message,
    });
  }
};

const updateApplication = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ApplicationService.updateApplication(
      req.user!.id,
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(404).json({
      success: false,
      message,
    });
  }
};

const deleteApplication = async (req: AuthRequest, res: Response) => {
  try {
    const result = await ApplicationService.deleteApplication(
      req.user!.id,
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(404).json({
      success: false,
      message,
    });
  }
};

export const ApplicationController = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
