import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import events from "../features/events/eventsSlice";
export const store = configureStore({
  reducer: {
    auth,
    events,
  },
});
