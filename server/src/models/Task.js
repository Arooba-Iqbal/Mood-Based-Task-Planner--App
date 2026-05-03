import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date
    }
  },
  { timestamps: true }
);

taskSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Task", taskSchema);
