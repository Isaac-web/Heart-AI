import { Appointment } from '@/types';
import { apiClient } from './apiClient';

const url = '/medical-reports/requests';
export const fetchAppointments = async () => {
  const { data: resData } = await apiClient.get<{
    data: Appointment[];
  }>(url);

  return resData.data;
};
