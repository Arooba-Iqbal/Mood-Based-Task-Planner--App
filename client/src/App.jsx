import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";
import { fetchDashboard, fetchMoodEntries, fetchSuggestion, saveMood } from "./features/mood/moodSlice";
import { addTask, deleteTask, fetchTasks, updateTask } from "./features/tasks/taskSlice";
import SiteLayout from "./layouts/SiteLayout";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import MoodPage from "./pages/MoodPage";
import ReportsPage from "./pages/ReportsPage";
import TasksPage from "./pages/TasksPage";

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const entries = useSelector((state) => state.mood.entries);
  const dashboard = useSelector((state) => state.mood.dashboard);
  const suggestion = useSelector((state) => state.mood.suggestion);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchMoodEntries());
    dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  }, [dispatch]);

  const handleAddTask = async (payload) => {
    await dispatch(addTask(payload));
    dispatch(fetchDashboard());
  };

  const handleToggleTask = async (task) => {
    await dispatch(updateTask({ id: task._id, data: { completed: !task.completed } }));
    dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  };

  const handleDeleteTask = async (id) => {
    await dispatch(deleteTask(id));
    dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  };

  const handleSaveMood = async (payload) => {
    await dispatch(saveMood(payload));
    dispatch(fetchMoodEntries());
    dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  };

  const downloadWeeklyReport = () => {
    window.open("http://localhost:5000/api/reports/weekly", "_blank");
  };

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage dashboard={dashboard} suggestion={suggestion} />} />
        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />
        <Route path="/mood" element={<MoodPage entries={entries} onSaveMood={handleSaveMood} />} />
        <Route path="/dashboard" element={<DashboardPage dashboard={dashboard} suggestion={suggestion} />} />
        <Route path="/reports" element={<ReportsPage onDownload={downloadWeeklyReport} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
