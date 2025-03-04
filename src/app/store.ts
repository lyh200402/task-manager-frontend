import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import teamsReducer from "../features/teams/teamsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    teams: teamsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
