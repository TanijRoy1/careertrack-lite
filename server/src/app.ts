import express from "express";
import cors from "cors";
import { AuthRoutes } from "./modules/auth/auth.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerTrack Lite API is running",
  });
});

export default app;
