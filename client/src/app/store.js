import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moodReducer from "../features/mood/moodSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    mood: moodReducer
  }
});
