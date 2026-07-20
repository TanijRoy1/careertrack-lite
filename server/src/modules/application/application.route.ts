import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import { ApplicationController } from "./application.controller";

const router = Router();

router.post("/", authMiddleware, ApplicationController.createApplication);
router.get("/", authMiddleware, ApplicationController.getApplications);
router.get("/:id", authMiddleware, ApplicationController.getApplicationById);



// router.get("/", (_req, res) => {
//   res.send("Application route works");
// });

export const ApplicationRoutes = router;
