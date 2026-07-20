import express from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/auth/auth.route";
import authMiddleware from "./middleware/auth.middleware";
import { AuthRequest } from "./types/auth.types";
import { ApplicationRoutes } from "./modules/application/application.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/applications", ApplicationRoutes);

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
