import {
  MedicalReport,
  MedicalReportFormData,
  MedicalReportSearchParams,
} from '@/types';
import { apiClient } from './apiClient';

export const createMedicalReport = async (data: MedicalReportFormData) => {
  const { data: resData } = await apiClient.post('/medical-reports', data);

  return resData;
};

export const fetchMedicalReports = async (
  params: MedicalReportSearchParams = {}
) => {
  const { data: resData } = await apiClient.get<{ data: MedicalReport[] }>(
    '/medical-reports',
    { params }
  );

  return resData.data;
};
