import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/user";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

// Signup Action
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data; // Assume backend returns { message: "User created" }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login Action
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, credentials);
      const { user, token } = response.data; 
      localStorage.setItem("user", JSON.stringify({ user, token })); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser?.user || null,
    token: storedUser?.token || null,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Signup Reducers
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      })

      // Login Reducers
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;
