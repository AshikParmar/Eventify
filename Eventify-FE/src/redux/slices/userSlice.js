import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authHeader } from "./eventSlice";

const API_URL = "http://localhost:3000/user";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const token = localStorage.getItem("token") || null;

// Signup Action
export const signupUser = createAsyncThunk(
  "signup",
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
  "login",
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


export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = authHeader();
      if (!token) return rejectWithValue("Unauthorized: Token missing");

      const response = await axios.put(`${API_URL}/change-password`, { oldPassword, newPassword }, {
        headers: { authorization: token, }, // Send token in headers
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//Update User
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ username, email }, { rejectWithValue }) => {
    try {
      const token = authHeader();
      if (!token) return rejectWithValue("Unauthorized: Token missing");

      const response = await axios.put(`${API_URL}/update-user`, { username, email }, {
        headers: { authorization: token },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser || null,
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
      //Signup user
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

      //Login user
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
      })

      // change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user.user = action.payload.user;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message;
      })

      //update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});


export const { logout } = userSlice.actions;
export default userSlice.reducer;
