import express from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/auth/auth.route";
import authMiddleware from "./middleware/auth.middleware";
import { AuthRequest } from "./types/auth.types";
import { ApplicationRoutes } from "./modules/application/application.route";
import { DashboardRoutes } from "./modules/dashboard/dashboard.route";
import { AIRoutes } from "./modules/ai/ai.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/applications", ApplicationRoutes);
app.use("/api/dashboard", DashboardRoutes);
app.use("/api/ai", AIRoutes);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerTrack Lite API is running.",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerTrack Lite API is running",
  });
});

app.get("/api/test", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    user: req.user,
  });
});

export default app;
