import axios from "axios";

const API_URL = "https://lyh-task-manager-b.vercel.app/teams";
const JOIN_TEAM_URL = "https://lyh-task-manager-b.vercel.app/join-team";

const getAuthHeader = () => {
  return { headers: { Authorization: localStorage.getItem("token") || "" } };
};

export const getTeams = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

export const createTeam = async (team: UpdateTeam) => {
  const response = await axios.post(API_URL, team, getAuthHeader());
  return response.data;
};

export const updateTeam = async (id: string, team: Team) => {
  const response = await axios.put(`${API_URL}/${id}`, team, getAuthHeader());
  return response.data;
};

export const deleteTeam = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return response.data;
};

export const joinTeamApi = async ({
  name,
  user,
}: {
  name: string;
  user: User;
}) => {
  const response = await axios.post(
    JOIN_TEAM_URL,
    { name, user },
    getAuthHeader()
  );
  return response.data;
};

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UpdateTeam {
  _id?: string;
  name: string;
  description: string;
  members: string[];
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  members: User[];
}
