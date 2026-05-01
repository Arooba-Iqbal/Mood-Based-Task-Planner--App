import Dashboard from "../components/Dashboard";
import SuggestionCard from "../components/SuggestionCard";

const DashboardPage = ({ dashboard, suggestion }) => {
  return (
    <section className="container page">
      <div className="section-head">
        <h2>Performance Dashboard</h2>
        <p>See trends between your emotional state and productivity outcomes.</p>
      </div>
      <div className="kpi-grid">
        <div className="kpi">
          <p>Total Tasks</p>
          <h3>{dashboard?.totalTasks ?? 0}</h3>
        </div>
        <div className="kpi">
          <p>Completed</p>
          <h3>{dashboard?.completedTasks ?? 0}</h3>
        </div>
        <div className="kpi">
          <p>Completion Rate</p>
          <h3>{dashboard?.completionRate ?? 0}%</h3>
        </div>
        <div className="kpi">
          <p>Latest Mood</p>
          <h3>{dashboard?.latestMood || "N/A"}</h3>
        </div>
      </div>
      <Dashboard dashboard={dashboard} />
      <SuggestionCard suggestion={suggestion} />
    </section>
  );
};

export default DashboardPage;
