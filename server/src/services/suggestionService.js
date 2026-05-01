export const getSuggestionByMood = (mood, pendingTasks) => {
  const taskCount = pendingTasks ?? 0;

  if (mood === "stressed") {
    return taskCount > 5
      ? "You have many pending tasks. Take a short 10-minute break, then finish one small task first."
      : "Stress looks high today. Try deep breathing and focus on just one priority task.";
  }

  if (mood === "sad") {
    return "Start with an easy task to build momentum, and add one self-care activity.";
  }

  return "Great mood today. Use this energy to complete your top-priority tasks.";
};
