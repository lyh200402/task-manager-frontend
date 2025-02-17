import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

const getAuthHeader = () => {
  return { headers: { Authorization: localStorage.getItem("token") || "" } };
};

export const getTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeader());
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await axios.post(API_URL, task, getAuthHeader());
  return response.data;
};

export const updateTask = async (id: string, task: Task) => {
  const response = await axios.put(`${API_URL}/${id}`, task, getAuthHeader());
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
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
