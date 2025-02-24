import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./slices/eventSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        event: eventReducer,
    }
})