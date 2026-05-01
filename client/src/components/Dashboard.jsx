import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = ({ dashboard }) => {
  if (!dashboard) return null;

  const moodData = (dashboard.moodCounts || []).map((item) => ({
    mood: item._id,
    count: item.count
  }));

  return (
    <div className="card">
      <h3>Dashboard: Mood vs Productivity</h3>
      <p>Total Tasks: {dashboard.totalTasks}</p>
      <p>Completed Tasks: {dashboard.completedTasks}</p>
      <p>Completion Rate: {dashboard.completionRate}%</p>
      <p>Latest Mood: {dashboard.latestMood || "N/A"}</p>
      <div className="chart">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4a90e2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
