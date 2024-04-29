import { MedicalReportRequest } from '@/types';
import { apiClient } from './apiClient';

const url = '/medical-reports/requests';
export const fetchMedicalReportRequest = async () => {
  const { data: resData } = await apiClient.get<{
    data: MedicalReportRequest[];
  }>(url, {
    params: {
      doctorId: '662e2bb120071a548aa9a5a1',
    },
  });

  return resData.data;
};
