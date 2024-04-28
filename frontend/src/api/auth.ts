import { LoginFormData, RegistrationFormData } from '@/types';
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

  console.log(resData);
};
