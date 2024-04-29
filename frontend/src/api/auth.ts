import { LoginFormData, RegistrationFormData, User } from '@/types';
import { apiClient } from './apiClient';

export const login = async (data: LoginFormData) => {
  const { data: resData } = await apiClient.post<{
    message: string;
    token: string;
  }>('/users/login', data);

  localStorage.setItem('heart-AI-token', resData.token);
};

export const register = async (data: RegistrationFormData) => {
  const { data: resData } = await apiClient.post('/users/register', data);

  return resData;
};

export const getCurrentUser = async () => {
  const { data: resData } = await apiClient.get<{ data: User }>('/users/me');

  return resData.data;
};
