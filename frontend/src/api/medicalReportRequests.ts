import { MedicalReportRequest } from '@/types';
import { apiClient } from './apiClient';
import { getUserId } from '@/utils/auth';

const url = '/medical-reports/requests';
export const fetchMedicalReportRequest = async () => {
  const { data: resData } = await apiClient.get<{
    data: MedicalReportRequest[];
  }>(url, {
    params: {
      doctorId: getUserId(),
    },
  });

  return resData.data;
};
