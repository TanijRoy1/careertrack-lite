import { Response } from "express";
import { AuthRequest } from "../../types/auth.types";
import { DashboardService } from "./dashboard.service";

const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const result = await DashboardService.getStats(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully.",
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

export const DashboardController = {
  getStats,
};
