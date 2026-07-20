import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get("/stats", authMiddleware, DashboardController.getStats);

export const DashboardRoutes = router;
