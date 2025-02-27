import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import eventReducer from "./slices/eventSlice";
import userReducer from "./slices/userSlice";
import userListReducer from "./slices/userListSlice";
import { combineReducers } from "redux"; // Import combineReducers

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
  userList: userListReducer,
});

// Persist Configurations for Redux Persist
const persistConfig = {
  key: "root", // Key for storage
  storage, // Use localStorage to persist data
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }),
});

// Persistor for store
export const persistor = persistStore(store);
