import axios from 'axios';
import appConfig from '../../app.config.json';

export const apiClient = axios.create({
  baseURL: appConfig.baseUrl,
});

apiClient.interceptors.request.use((req) => {
  const token = localStorage.getItem('auth-token');
  if (!token) return req;

  req.headers['Authorization'] = `Bearer ${token}`;
  return req;
});
