import { Appointment, AppointmentsSearchParams } from '@/types';
import { apiClient } from './apiClient';

const url = '/medical-reports/requests';
export const fetchAppointments = async (
  params: AppointmentsSearchParams = {}
) => {
  const { data: resData } = await apiClient.get<{
    data: Appointment[];
  }>(url, {
    params,
  });

  return resData.data;
};
