import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMoodEntries = createAsyncThunk("mood/fetchMoodEntries", async () => {
  const response = await api.get("/moods");
  return response.data;
});

export const saveMood = createAsyncThunk("mood/saveMood", async (payload) => {
  const response = await api.post("/moods", payload);
  return response.data;
});

export const fetchDashboard = createAsyncThunk("mood/fetchDashboard", async () => {
  const response = await api.get("/moods/dashboard");
  return response.data;
});

export const fetchSuggestion = createAsyncThunk("mood/fetchSuggestion", async () => {
  const response = await api.get("/moods/suggestions/today");
  return response.data;
});

const moodSlice = createSlice({
  name: "mood",
  initialState: {
    entries: [],
    dashboard: null,
    suggestion: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoodEntries.fulfilled, (state, action) => {
        state.entries = action.payload;
      })
      .addCase(saveMood.fulfilled, (state, action) => {
        const index = state.entries.findIndex((entry) => entry._id === action.payload._id);
        if (index !== -1) {
          state.entries[index] = action.payload;
        } else {
          state.entries.unshift(action.payload);
        }
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload;
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.suggestion = action.payload;
      });
  }
});

export default moodSlice.reducer;
