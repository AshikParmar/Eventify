import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const API_URL = "http://localhost:3000/events";
export function authHeader() {
  const token = localStorage.getItem("token");
  return  token || "" ;
}

// Fetch All Events
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/fetchevents`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Fetch Event by ID
export const fetchEventById = createAsyncThunk("events/fetchEventById", async (eventId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/fetchevents/${eventId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add Event
export const addEvent = createAsyncThunk("events/addEvent", async (newEvent, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/create`, newEvent,{
      headers:{ 
        "authorization": authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete Event
export const deleteEvent = createAsyncThunk("events/deleteEvent", async (eventId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/delete/${eventId}`,{
      headers:{ 
        "authorization": authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return eventId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Event
export const updateEvent = createAsyncThunk(
  "events/updateEvent", async (updatedEvent, { rejectWithValue }) => {
  try {
    console.log("here",updatedEvent.get("title"))
    const response = await axios.put(`${API_URL}/update/${updatedEvent.get("_id")}`, updatedEvent,{
      headers:{ 
        "authorization": authHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Join Event (User Enrollment)
export const joinEvent = createAsyncThunk("events/joinEvent", async ({ eventId, userId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/joinevent`, { eventId,userId });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Create Slice
const eventSlice = createSlice({
  name: "events",
  initialState:{
    events: [],
    ucEvents: [],
    selectedEvent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data.events;
        state.ucEvents = action.payload.data.ucEvents;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload.data;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Add Event
      .addCase(addEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload.data);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex((event) => event._id === action.payload.data._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      //  Join Event
      .addCase(joinEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex((event) => event._id === action.payload.data._id);
        if (index !== -1) {
          state.events[index] = action.payload.data;
        }
        if (state.selectedEvent && state.selectedEvent._id === action.payload.data._id) {
          state.selectedEvent = action.payload.data;
        }
      })
      .addCase(joinEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default eventSlice.reducer;
