import {
  Doctor,
  DoctorUpdateFormData,
  LoginFormData,
  RegistrationFormData,
  User,
} from '@/types';
import { apiClient } from './apiClient';

export const login = async (data: LoginFormData) => {
  const { data: resData } = await apiClient.post<{
    message: string;
    token: string;
  }>('/users/login', data);

  localStorage.setItem('heart-AI-token', resData.token);
};

export const loginDoctor = async (data: LoginFormData) => {
  const { data: resData } = await apiClient.post<{
    data: Doctor;
    token: string;
  }>('/doctors/login', data);

  return resData;
};

export const registerDoctor = async (data: RegistrationFormData) => {
  const { data: resData } = await apiClient.post<{
    data: Doctor;
    token: string;
  }>('/doctors/register', data);

  return resData;
};

export const getCurrentDoctor = async () => {
  const { data: resData } = await apiClient.get<{ data: Doctor }>(
    '/doctors/me'
  );

  return resData.data;
};

export const updateDoctor = async (
  doctorId: string,
  data: DoctorUpdateFormData
) => {
  const { data: resData } = await apiClient.patch<{
    data: Doctor;
  }>(`/doctors/${doctorId}`, data);

  return resData;
};

export const getCurrentUser = async () => {
  const { data: resData } = await apiClient.get<{ data: User }>('/users/me');

  return resData.data;
};
