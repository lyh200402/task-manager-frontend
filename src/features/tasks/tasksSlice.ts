import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Task,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/tasksApi";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (teamId?: string) => {
    const tasks = await getTasks(teamId);
    return tasks;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ task, teamId }: { task: Task; teamId?: string }) => {
    const newTask = await createTask(task, teamId);
    return newTask;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ task, teamId }: { task: Task; teamId?: string }) => {
    if (task._id) {
      const updatedTask = await updateTask(task._id, task, teamId);
      return updatedTask;
    }
    throw new Error("Task ID is required for editing.");
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async ({ id, teamId }: { id: string; teamId?: string }) => {
    await deleteTask(id, teamId);
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
