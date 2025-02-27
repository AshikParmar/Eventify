import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/user";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

// Signup Action
export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
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
  
      // console.log('Full response:', response);
      // console.log('Response data:', response.data);

     
      const { user, accessToken } = response.data;
      // console.log('User:', user);
      // console.log('Access Token:', accessToken);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);


      return response.data;  
    } catch (error) {
      console.error('Error in loginUser:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "An unknown error occurred");
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser|| null,
    token: token || null,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; 
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  
  extraReducers: (builder) => {
    builder
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

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
        state.token = action.payload.accessToken; 
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
