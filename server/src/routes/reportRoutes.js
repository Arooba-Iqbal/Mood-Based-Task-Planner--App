import { Router } from "express";
import { getWeeklyPdfReport } from "../controllers/reportController.js";

const router = Router();

router.get("/weekly", getWeeklyPdfReport);

export default router;
