import dayjs from "dayjs";
import MoodPicker from "../components/MoodPicker";

const MoodPage = ({ entries, onSaveMood }) => {
  return (
    <section className="container page">
      <div className="section-head">
        <h2>Mood Journal</h2>
        <p>Track emotional patterns and understand how mood impacts productivity.</p>
      </div>
      <div className="two-col">
        <MoodPicker onSave={onSaveMood} />
        <div className="card">
          <h3>Recent Entries</h3>
          {entries.length === 0 ? (
            <p>No mood entries yet.</p>
          ) : (
            <ul className="list">
              {entries.slice(0, 8).map((entry) => (
                <li key={entry._id}>
                  <div>
                    <strong className={`mood mood-${entry.mood}`}>{entry.mood}</strong>
                    <p>{dayjs(entry.date).format("MMM D, YYYY")}</p>
                    {entry.notes ? <p>{entry.notes}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoodPage;
