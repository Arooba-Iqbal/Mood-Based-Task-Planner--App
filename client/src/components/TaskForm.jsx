import { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, dueDate: dueDate || null });
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Add Task</h3>
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
      />
      <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
