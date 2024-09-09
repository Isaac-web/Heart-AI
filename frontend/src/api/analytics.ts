import { apiClient } from './apiClient';

const url = '/analytics/doctor-summary';
export const loadDoctorAnalytics = async () => {
  const { data: resData } = await apiClient.get<{
    data: {
      pendingAppointments: number;
      healthyReports: number;
      unhealthyReports: number;
    };
  }>(url);

  return resData.data;
};
