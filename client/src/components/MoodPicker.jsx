import { useState } from "react";
import dayjs from "dayjs";

const MoodPicker = ({ onSave }) => {
  const [mood, setMood] = useState("happy");
  const [notes, setNotes] = useState("");

  const submitMood = (event) => {
    event.preventDefault();
    onSave({ mood, notes, date: dayjs().format("YYYY-MM-DD") });
    setNotes("");
  };

  return (
    <form className="card" onSubmit={submitMood}>
      <h3>How do you feel today?</h3>
      <select value={mood} onChange={(event) => setMood(event.target.value)}>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="stressed">Stressed</option>
      </select>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Optional notes"
      />
      <button type="submit">Save Mood</button>
    </form>
  );
};

export default MoodPicker;
