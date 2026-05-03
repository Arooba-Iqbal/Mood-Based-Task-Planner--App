import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
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

moodEntrySchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("MoodEntry", moodEntrySchema);
