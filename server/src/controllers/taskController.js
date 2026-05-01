import Task from "../models/Task.js";

export const getTasks = async (_req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await Task.create({ title, description, dueDate });
  return res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json({ message: "Task deleted" });
};
