// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const response = await api.get('/teams');
    return response.data;
  } catch (error) {
    throw error;
  }
};
