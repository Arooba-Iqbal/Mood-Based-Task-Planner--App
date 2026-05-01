import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      enum: ["happy", "sad", "stressed"],
      required: true
    },
    notes: {
      type: String,
      default: ""
    },
    date: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

moodEntrySchema.index({ date: 1 }, { unique: true });

export default mongoose.model("MoodEntry", moodEntrySchema);
