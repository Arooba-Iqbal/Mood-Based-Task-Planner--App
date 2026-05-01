import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await api.get("/tasks");
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (payload) => {
  const response = await api.post("/tasks", payload);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, data }) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  }
});

export default taskSlice.reducer;
