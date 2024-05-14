import {
  Appointment,
  AppointmentFormData,
  AppointmentsSearchParams,
} from '@/types';
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

export const createAppointment = async (data: AppointmentFormData) => {
  const { data: resData } = await apiClient.post<{ data: Appointment }>(
    url,
    data
  );

  return resData.data;
};
