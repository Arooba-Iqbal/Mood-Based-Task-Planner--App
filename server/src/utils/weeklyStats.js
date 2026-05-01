import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween);

export const buildWeeklyStats = (tasks, moods, startDate) => {
  const start = dayjs(startDate).startOf("day");
  const end = start.add(6, "day").endOf("day");

  const createdThisWeek = tasks.filter((task) =>
    dayjs(task.createdAt).isBetween(start, end, null, "[]")
  ).length;

  const completedThisWeek = tasks.filter(
    (task) =>
      task.completed &&
      task.updatedAt &&
      dayjs(task.updatedAt).isBetween(start, end, null, "[]")
  ).length;

  const moodCounts = moods.reduce(
    (acc, item) => {
      acc[item.mood] += 1;
      return acc;
    },
    { happy: 0, sad: 0, stressed: 0 }
  );

  const productivityScore = createdThisWeek
    ? Math.round((completedThisWeek / createdThisWeek) * 100)
    : 0;

  return {
    period: `${start.format("YYYY-MM-DD")} to ${end.format("YYYY-MM-DD")}`,
    createdThisWeek,
    completedThisWeek,
    moodCounts,
    productivityScore
  };
};
