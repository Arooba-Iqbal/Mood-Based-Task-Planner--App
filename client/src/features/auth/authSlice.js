import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  token: tokenFromStorage || null,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  loading: false,
  error: null
};

export const signup = createAsyncThunk("auth/signup", async (payload, thunkApi) => {
  try {
    const response = await api.post("/auth/signup", payload);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

export const login = createAsyncThunk("auth/login", async (payload, thunkApi) => {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkApi) => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || "Session invalid");
  }
});

const persistSession = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      clearSession();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistSession(action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistSession(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.token = null;
        state.user = null;
        clearSession();
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
