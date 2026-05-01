import { configureStore } from "@reduxjs/toolkit";
import moodReducer from "../features/mood/moodSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    mood: moodReducer
  }
});
