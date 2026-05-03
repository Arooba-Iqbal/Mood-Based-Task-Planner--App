import { Router } from "express";
import { getWeeklyPdfReport } from "../controllers/reportController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.get("/weekly", protect, getWeeklyPdfReport);

export default router;
