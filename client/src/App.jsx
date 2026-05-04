import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";
import { fetchMe, login, logout, signup } from "./features/auth/authSlice";
import { fetchDashboard, fetchMoodEntries, fetchSuggestion, saveMood } from "./features/mood/moodSlice";
import { addTask, deleteTask, fetchTasks, updateTask } from "./features/tasks/taskSlice";
import SiteLayout from "./layouts/SiteLayout";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MoodPage from "./pages/MoodPage";
import ReportsPage from "./pages/ReportsPage";
import SignupPage from "./pages/SignupPage";
import TasksPage from "./pages/TasksPage";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tasks = useSelector((state) => state.tasks.items);
  const entries = useSelector((state) => state.mood.entries);
  const dashboard = useSelector((state) => state.mood.dashboard);
  const suggestion = useSelector((state) => state.mood.suggestion);
  const isAuthenticated = Boolean(auth.token);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    dispatch(fetchMe());
    dispatch(fetchTasks());
    dispatch(fetchMoodEntries());
    dispatch(fetchDashboard());
    dispatch(fetchSuggestion());
  }, [dispatch, isAuthenticated]);

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

  const handleSecureDownloadWeeklyReport = async () => {
    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const response = await fetch(`${API_BASE}/api/reports/weekly`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    if (!response.ok) {
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "weekly-report.pdf";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage
              onSubmit={(payload) => dispatch(login(payload))}
              loading={auth.loading}
              error={auth.error}
            />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <SignupPage
              onSubmit={(payload) => dispatch(signup(payload))}
              loading={auth.loading}
              error={auth.error}
            />
          )
        }
      />

      <Route
        element={
          isAuthenticated ? (
            <SiteLayout user={auth.user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/" element={<HomePage dashboard={dashboard} suggestion={suggestion} user={auth.user} />} />
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
        <Route path="/reports" element={<ReportsPage onDownload={handleSecureDownloadWeeklyReport} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
