import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}/user`;


// Fetch All Events
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/fetchusers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });


  export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_URL}/getuser/${userId}`);
        return response.data;
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message || "Error In Fetching Data");
      }
    }
  );
  

// Create Slice
const UserListSlice = createSlice({
    name: "userList",
    initialState:{
      users: [],
      selectedUser: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch Users
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.data;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.users = [];
          state.error = action.payload.message;
        })
  
        // Fetch User by ID
        .addCase(fetchUserById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUserById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedUser = action.payload.data;
          state.error = null
        })
        .addCase(fetchUserById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    },
});  

export default UserListSlice.reducer;