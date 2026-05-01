import dayjs from "dayjs";
import MoodEntry from "../models/MoodEntry.js";
import Task from "../models/Task.js";
import { getSuggestionByMood } from "../services/suggestionService.js";

export const upsertMoodForDate = async (req, res) => {
  const { mood, notes, date } = req.body;
  if (!mood || !date) {
    return res.status(400).json({ message: "Mood and date are required" });
  }

  const normalizedDate = dayjs(date).startOf("day").toDate();

  const moodEntry = await MoodEntry.findOneAndUpdate(
    { date: normalizedDate },
    { mood, notes, date: normalizedDate },
    { new: true, upsert: true, runValidators: true }
  );

  return res.status(201).json(moodEntry);
};

export const getMoodEntries = async (_req, res) => {
  const entries = await MoodEntry.find().sort({ date: -1 });
  res.json(entries);
};

export const getDashboard = async (_req, res) => {
  const [totalTasks, completedTasks, latestMood] = await Promise.all([
    Task.countDocuments(),
    Task.countDocuments({ completed: true }),
    MoodEntry.findOne().sort({ date: -1 })
  ]);

  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const moodCounts = await MoodEntry.aggregate([
    {
      $group: {
        _id: "$mood",
        count: { $sum: 1 }
      }
    }
  ]);

  return res.json({
    totalTasks,
    completedTasks,
    completionRate,
    latestMood: latestMood?.mood || null,
    moodCounts
  });
};

export const getDailySuggestion = async (_req, res) => {
  const [latestMood, pendingTasks] = await Promise.all([
    MoodEntry.findOne().sort({ date: -1 }),
    Task.countDocuments({ completed: false })
  ]);

  if (!latestMood) {
    return res.json({
      suggestion: "Add your first mood entry to get personalized suggestions."
    });
  }

  return res.json({
    mood: latestMood.mood,
    pendingTasks,
    suggestion: getSuggestionByMood(latestMood.mood, pendingTasks)
  });
};
