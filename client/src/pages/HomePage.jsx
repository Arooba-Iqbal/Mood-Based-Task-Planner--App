import { Link } from "react-router-dom";

const HomePage = ({ dashboard, suggestion }) => {
  return (
    <section className="container page">
      <div className="hero">
        <div>
          <h2>Organize your life with emotional intelligence</h2>
          <p>
            Manage tasks, log your mood, and get smart suggestions that help you stay productive
            without burnout.
          </p>
          <div className="hero-actions">
            <Link to="/tasks" className="btn primary">
              Manage Tasks
            </Link>
            <Link to="/mood" className="btn ghost">
              Track Mood
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>Today at a glance</h3>
          <p>Completion Rate: {dashboard?.completionRate ?? 0}%</p>
          <p>Latest Mood: {dashboard?.latestMood || "Not set"}</p>
          <p className="tip">{suggestion?.suggestion || "Add your mood to unlock suggestions."}</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
