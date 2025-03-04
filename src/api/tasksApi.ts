import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

interface AxiosConfig {
  headers: { Authorization: string };
  params?: { [key: string]: string };
}

const getAuthHeader = (): AxiosConfig => {
  return { headers: { Authorization: localStorage.getItem("token") || "" } };
};

export const getTasks = async (teamId?: string) => {
  const config: AxiosConfig = getAuthHeader();
  if (teamId) {
    config.params = { teamId: teamId };
  }
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const createTask = async (task: Task, teamId?: string) => {
  const config: AxiosConfig = getAuthHeader();
  if (teamId) {
    config.params = { teamId: teamId };
  }
  const response = await axios.post(API_URL, task, config);
  return response.data;
};

export const updateTask = async (id: string, task: Task, teamId?: string) => {
  const config: AxiosConfig = getAuthHeader();
  if (teamId) {
    config.params = { teamId: teamId };
  }
  const response = await axios.put(`${API_URL}/${id}`, task, config);
  return response.data;
};

export const deleteTask = async (id: string, teamId?: string) => {
  const config: AxiosConfig = getAuthHeader();
  if (teamId) {
    config.params = { teamId: teamId };
  }
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

export interface Task {
  _id?: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  tags?: string[];
}
