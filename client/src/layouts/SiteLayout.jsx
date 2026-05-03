import { NavLink, Outlet } from "react-router-dom";

const SiteLayout = ({ user, onLogout }) => {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-row">
          <div className="brand">
            <span className="brand-badge">DL</span>
            <div>
              <h1>Daily Life Organizer</h1>
              <p>Plan your day, protect your mood</p>
            </div>
          </div>
          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/mood">Mood</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/reports">Reports</NavLink>
          </nav>
          <div className="header-user">
            <span>{user?.name}</span>
            <button type="button" className="ghost logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <p>Daily Life Organizer with Mood Tracking</p>
          <p>Build habits, stay productive, stay balanced.</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
