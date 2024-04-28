import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

apiClient.interceptors.request.use((req) => {
  const token = localStorage.getItem('heart-AI-token');
  if (!token) return req;

  req.headers['Authorization'] = `Bearer ${token}`;
  return req;
});
