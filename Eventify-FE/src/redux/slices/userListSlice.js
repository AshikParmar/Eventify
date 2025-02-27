import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/user";


// Fetch All Events
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/fetchusers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

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
          state.error = action.payload.error;
        })
  
        // Fetch Event by ID
        // .addCase(fetchEventById.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        // })
        // .addCase(fetchEventById.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.selectedEvent = action.payload.data;
        // })
        // .addCase(fetchEventById.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload.error;
        // })
    },
});  

export default UserListSlice.reducer;