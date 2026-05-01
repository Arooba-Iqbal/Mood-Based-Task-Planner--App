const ReportsPage = ({ onDownload }) => {
  return (
    <section className="container page">
      <div className="section-head">
        <h2>Reports Center</h2>
        <p>Generate weekly PDF summaries to review achievements and emotional trends.</p>
      </div>
      <div className="card report-card">
        <h3>Weekly PDF Report</h3>
        <p>
          Includes completed tasks, productivity score, mood distribution, and recommended action for
          next week.
        </p>
        <button className="btn primary" onClick={onDownload}>
          Download Weekly Report
        </button>
      </div>
    </section>
  );
};

export default ReportsPage;
