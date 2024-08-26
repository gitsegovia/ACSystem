// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import user from "src/store/apps/user";
import administrative from "src/store/apps/administrative";
import calendar from "src/store/apps/calendar";
import permissions from "src/store/apps/permissions";

export const store = configureStore({
  reducer: {
    user,
    administrative,
    calendar,
    permissions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
