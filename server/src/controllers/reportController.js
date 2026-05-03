import dayjs from "dayjs";
import PDFDocument from "pdfkit";
import Task from "../models/Task.js";
import MoodEntry from "../models/MoodEntry.js";
import { buildWeeklyStats } from "../utils/weeklyStats.js";

export const getWeeklyPdfReport = async (req, res) => {
  const startDate = req.query.startDate
    ? dayjs(req.query.startDate).startOf("day")
    : dayjs().startOf("week");

  const endDate = startDate.add(6, "day").endOf("day");

  const [tasks, moods] = await Promise.all([
    Task.find({
      user: req.user._id,
      $or: [
        { createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() } },
        { updatedAt: { $gte: startDate.toDate(), $lte: endDate.toDate() } }
      ]
    }).sort({ createdAt: -1 }),
    MoodEntry.find({
      user: req.user._id,
      date: { $gte: startDate.toDate(), $lte: endDate.toDate() }
    }).sort({ date: 1 })
  ]);

  const stats = buildWeeklyStats(tasks, moods, startDate.toDate());

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=weekly-report.pdf");

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);

  doc.fontSize(20).text("Daily Life Organizer - Weekly Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Period: ${stats.period}`);
  doc.text(`Generated for: ${req.user.name} (${req.user.email})`);
  doc.text(`Tasks created: ${stats.createdThisWeek}`);
  doc.text(`Tasks completed: ${stats.completedThisWeek}`);
  doc.text(`Productivity score: ${stats.productivityScore}%`);
  doc.moveDown();
  doc.text(`Happy days: ${stats.moodCounts.happy}`);
  doc.text(`Sad days: ${stats.moodCounts.sad}`);
  doc.text(`Stressed days: ${stats.moodCounts.stressed}`);

  doc.moveDown();
  doc.fontSize(14).text("Top Recommendation");
  if (stats.moodCounts.stressed >= 3) {
    doc.fontSize(12).text("Stress trend is high this week. Schedule short breaks and reduce daily task load.");
  } else {
    doc.fontSize(12).text("Keep your current momentum and complete top-priority tasks first.");
  }

  doc.end();
};
