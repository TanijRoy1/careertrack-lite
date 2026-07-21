import { Router } from "express";
import { AIController } from "./ai.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/analyze-job",  AIController.analyzeJob);

export const AIRoutes = router;
