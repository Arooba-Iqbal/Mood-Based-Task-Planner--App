import { Router } from "express";
import {
  getDashboard,
  getDailySuggestion,
  getMoodEntries,
  upsertMoodForDate
} from "../controllers/moodController.js";

const router = Router();

router.get("/", getMoodEntries);
router.post("/", upsertMoodForDate);
router.get("/dashboard", getDashboard);
router.get("/suggestions/today", getDailySuggestion);

export default router;
