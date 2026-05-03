import { Router } from "express";
import {
  getDashboard,
  getDailySuggestion,
  getMoodEntries,
  upsertMoodForDate
} from "../controllers/moodController.js";
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.get("/", getMoodEntries);
router.post("/", upsertMoodForDate);
router.get("/dashboard", getDashboard);
router.get("/suggestions/today", getDailySuggestion);

export default router;
