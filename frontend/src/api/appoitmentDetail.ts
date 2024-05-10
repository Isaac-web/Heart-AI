import { Appointment } from '@/types';
import { apiClient } from './apiClient';

export const getAppoitmentById = async (id: string) => {
  const { data: resData } = await apiClient.get<{ data: Appointment }>(
    `/medical-reports/requests/${id}`
  );

  return resData.data;
};
