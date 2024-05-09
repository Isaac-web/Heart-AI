import { StateCreator } from 'zustand';
import { MedicalReportRequestSlice, StoreState } from './types';
import { handleError } from '@/utils/errorHandler';
import { fetchMedicalReportRequest } from '@/api/appointments';

export const createMedicalReportRequestSlice: StateCreator<
  StoreState,
  [],
  [],
  MedicalReportRequestSlice
> = (set) => ({
  medicalReportRequests: [],
  loadingMedicalReportRequests: false,
  async fetchMedicalReportRequests() {
    set({ loadingMedicalReportRequests: true });
    try {
      const data = await fetchMedicalReportRequest();
      set({ medicalReportRequests: data });
    } catch (err) {
      handleError(err as Error);
    } finally {
      set({ loadingMedicalReportRequests: false });
    }
  },
});
