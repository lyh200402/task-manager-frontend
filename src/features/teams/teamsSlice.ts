import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  UpdateTeam,
  Team,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  joinTeamApi,
} from "../../api/teamsApi";

interface TeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  const teams = await getTeams();
  return teams;
});

export const addTeam = createAsyncThunk(
  "teams/addTeam",
  async (team: UpdateTeam) => {
    const newTeam = await createTeam(team);
    return newTeam;
  }
);

export const editTeam = createAsyncThunk(
  "teams/editTeam",
  async (team: Team) => {
    if (team._id) {
      const updatedTeam = await updateTeam(team._id, team);
      return updatedTeam;
    }
    throw new Error("Team ID is required for editing.");
  }
);

export const removeTeam = createAsyncThunk(
  "teams/removeTeam",
  async ({ teamId }: { teamId: string }) => {
    await deleteTeam(teamId);
    return teamId;
  }
);

export const joinTeam = createAsyncThunk(
  "teams/joinTeam",
  async ({ name, user }: { name: string; user: any }) => {
    const response = await joinTeamApi({ name, user });
    return response;
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch teams";
      })
      .addCase(addTeam.fulfilled, (state, action) => {
        if (!state.teams) {
          state.teams = [];
        }
        state.teams.push(action.payload);
      })
      .addCase(editTeam.fulfilled, (state, action) => {
        if (state.teams) {
          const index = state.teams.findIndex(
            (team) => team._id === action.payload.id
          );
          if (index !== -1) {
            state.teams[index] = action.payload;
          }
        }
      })
      .addCase(removeTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter((team) => team._id !== action.payload);
        state.loading = false;
      })
      .addCase(removeTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove team";
      })
      .addCase(joinTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload);
        state.loading = false;
      })
      .addCase(joinTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to join team";
      });
  },
});

export default teamsSlice.reducer;
