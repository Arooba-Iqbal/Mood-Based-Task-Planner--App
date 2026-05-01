import dayjs from "dayjs";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="card">
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <li key={task._id}>
              <div>
                <strong>{task.title}</strong>
                {task.description ? <p>{task.description}</p> : null}
                {task.dueDate ? <p>Due: {dayjs(task.dueDate).format("MMM D, YYYY")}</p> : null}
                <span className={`pill ${task.completed ? "pill-done" : "pill-pending"}`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
              <div className="actions">
                <button onClick={() => onToggle(task)}>{task.completed ? "Undo" : "Done"}</button>
                <button className="danger" onClick={() => onDelete(task._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
