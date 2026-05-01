import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TasksPage = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  return (
    <section className="container page">
      <div className="section-head">
        <h2>Task Planner</h2>
        <p>Create, complete, and clean up tasks with ease.</p>
      </div>
      <div className="two-col">
        <TaskForm onSubmit={onAddTask} />
        <TaskList tasks={tasks} onToggle={onToggleTask} onDelete={onDeleteTask} />
      </div>
    </section>
  );
};

export default TasksPage;
