import axios from 'axios';

// Create an Axios instance pointing to the backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true
});

export default api;
