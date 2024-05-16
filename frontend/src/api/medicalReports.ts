import {
  MedicalReport,
  MedicalReportFormData,
  MedicalReportSearchParams,
  MedicalReportUpdateFormData,
} from '@/types';
import { apiClient } from './apiClient';

export const createMedicalReport = async (data: MedicalReportFormData) => {
  const { data: resData } = await apiClient.post<{ data: MedicalReport }>(
    '/medical-reports',
    data
  );

  return resData.data;
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

export const getCurrentUserMedicalReports = async () => {
  const { data: resData } = await apiClient.get<{ data: MedicalReport[] }>(
    '/medical-reports/me'
  );

  console.log(resData);

  return resData.data;
};

export const getMedicalReportById = async (id: string) => {
  const { data: resData } = await apiClient.get<{ data: MedicalReport }>(
    `/medical-reports/${id}`
  );

  return resData.data;
};

export const updateMedicalReport = async (
  id: string,
  data: MedicalReportUpdateFormData
) => {
  const { data: resData } = await apiClient.patch<{ data: MedicalReport }>(
    `/medical-reports/${id}`,
    data
  );

  return resData.data;
};
