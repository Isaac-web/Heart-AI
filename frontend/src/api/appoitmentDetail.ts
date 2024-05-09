import { Appointment } from '@/types';
import { apiClient } from './apiClient';

const getAppoitmentById = (id: string) => {
  apiClient.get<{ data: Appointment }>('/');
};
